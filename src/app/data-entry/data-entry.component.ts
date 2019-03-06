import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AppService } from "../app.service";

@Component({
  selector: "app-data-entry",
  templateUrl: "./data-entry.component.html",
  styleUrls: ["./data-entry.component.scss"]
})
export class DataEntryComponent implements OnInit {
  selectedClass = null;
  selectedSession = null;
  classesList = [];
  termsList = [];
  showAddSubjectRow = false;
  dataEntryForm = new FormGroup({
    session: new FormControl(),
    class: new FormControl(),
    term: new FormControl(),
    student_roll_no: new FormControl()
  });
  allSubjects = [];
  selectedSubjects = [];
  studentInfo = null;
  showAddMarksSection = false;

  isLinear = false;
  isOptional = false;
  firstFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  absentCheckSelected = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _appService: AppService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      rollNumber: ["", Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      session: ["", Validators.required],
      term: ["", Validators.required]
    });

    this.fourthFormGroup = this._formBuilder.group({
      subject_id: ["", Validators.required],
      subject_marks: ["", Validators.required],
      subject_grade: [""],
      absent_check: [false]
    });

    this.classesList = [
      { id: "1", val: "I" },
      { id: "2", val: "II" },
      { id: "3", val: "III" },
      { id: "4", val: "IV" },
      { id: "5", val: "V" },
      { id: "6", val: "VI" },
      { id: "7", val: "VII" },
      { id: "8", val: "VIII" },
      { id: "9", val: "IX" },
      { id: "10", val: "X" }
    ];
    this.termsList = [
      { id: "1", val: "Term I" },
      { id: "2", val: "Term II" },
      { id: "3", val: "Term III" }
    ];
  }

  getClassNameById(classId) {
    let index = this.classesList.filter(_ => _.id == classId);
    return index.length > 0 ? index[0]["val"] : classId;
  }

  getSubjectListForSession() {
    let payload = {
      session: this.thirdFormGroup.controls["session"].value,
      class_name: this.studentInfo["class_name"],
      roll_no: this.studentInfo["roll_no"],
      term: this.thirdFormGroup.controls["term"].value
    };
    this._appService.getSubjectsForSession(payload).subscribe((data: {}) => {
      if (null != data && data["status"] == 200) {
        this.allSubjects = data["selected_subjects"];
        this.selectedSubjects = [];
        this.showAddSubjectRow = true;
        this.getStudentMarks(payload);
      }
    });
  }

  getStudentMarks(payload) {
    this._appService.getStudentMarks(payload).subscribe((data: {}) => {
      if (null != data && data["status"] == 200) {
        this.selectedSubjects = data["marks"] == null ? [] : data["marks"];
        this.showAddSubjectRow = true;
      }
    });
  }

  onClickSubmit(action) {
    if (action == "GET_STU_INFO") {
      let studentRollNo = this.firstFormGroup.controls["rollNumber"].value;
      let payload = {
        roll_no: studentRollNo
      };
      this.studentInfo = {};
      this._appService.getStudentDetails(payload).subscribe((data: {}) => {
        if (null == data["student_details"]) {
          alert(data["message"]);
        } else {
          this.studentInfo = data["student_details"];
          this.showAddSubjectRow = true;
        }
      });
    } else if (action == "ADD_MARKS") {
      this.showAddMarksSection = true;
    }
  }

  onClickAbsentBtn() {
    this.absentCheckSelected = !this.absentCheckSelected;
    if (this.absentCheckSelected) {
      this.fourthFormGroup.controls["subject_marks"].disable();
      this.fourthFormGroup.controls["subject_marks"].setValue(null);
      this.fourthFormGroup.controls["subject_grade"].disable();
      this.fourthFormGroup.controls["subject_grade"].setValue(null);
    } else {
      this.fourthFormGroup.controls["subject_marks"].enable();
      this.fourthFormGroup.controls["subject_grade"].enable();
    }
  }

  onSubjectSelection() {
    let selectedSubjectId = this.fourthFormGroup.controls["subject_id"].value;
    let selectedSubject = this.allSubjects.filter(
      _ => _.subject_id == selectedSubjectId
    );
    this.fourthFormGroup.controls["absent_check"].setValue(false);
    this.absentCheckSelected = false;
    let markingType = selectedSubject[0]["marking_type"];
    if (markingType == "number") {
      this.fourthFormGroup.controls["subject_marks"].enable();
      this.fourthFormGroup.controls["subject_marks"].setValue(null);
      this.fourthFormGroup.controls["subject_grade"].disable();
      this.fourthFormGroup.controls["subject_grade"].setValue(null);
    } else if (markingType == "grade") {
      this.fourthFormGroup.controls["subject_marks"].disable();
      this.fourthFormGroup.controls["subject_marks"].setValue(null);
      this.fourthFormGroup.controls["subject_grade"].enable();
      this.fourthFormGroup.controls["subject_grade"].setValue(null);
    }
  }

  onClickAddSubject() {
    let selectedSubjectId = this.fourthFormGroup.controls["subject_id"].value;
    let selectedSubject = this.allSubjects.filter(
      _ => _.subject_id == selectedSubjectId
    );
    if (selectedSubject.length == 0) {
      return;
    }
    let markingType = selectedSubject[0]["marking_type"];
    let selectedSubjectMarks = null;
    if (markingType == "number" && !this.absentCheckSelected) {
      selectedSubjectMarks = this.fourthFormGroup.controls["subject_marks"]
        .value;
    } else if (markingType == "grade" && !this.absentCheckSelected) {
      selectedSubjectMarks = this.fourthFormGroup.controls["subject_grade"]
        .value;
    }

    selectedSubjectMarks =
      selectedSubjectMarks == null ||
      selectedSubjectMarks == undefined ||
      selectedSubjectMarks == ""
        ? null
        : selectedSubjectMarks;
    if (
      null != selectedSubjectId &&
      ((this.absentCheckSelected && null == selectedSubjectMarks) ||
        (!this.absentCheckSelected && null != selectedSubjectMarks))
    ) {
      let selectedSubject = this.allSubjects.filter(
        _ => _.subject_id == selectedSubjectId
      );
      if (this.checkIfSubjectAlreadySelected(selectedSubjectId)) {
        alert(
          "Subject: " +
            selectedSubject[0]["subject_label"] +
            " is already selected"
        );
        return;
      }
      let subjectObj = {
        subject_label: selectedSubject[0]["subject_label"],
        marking_type: selectedSubject[0]["marking_type"],
        subject_id: selectedSubject[0]["subject_id"],
        class_subject_allotment_id:
          selectedSubject[0]["class_subject_allotment_id"]
      };
      subjectObj["absentCheckSelected"] = false;
      if (markingType == "number" && !this.absentCheckSelected) {
        subjectObj["number"] = selectedSubjectMarks;
      }
      if (markingType == "grade" && !this.absentCheckSelected) {
        subjectObj["grade"] = selectedSubjectMarks;
      }
      if (this.absentCheckSelected) {
        subjectObj["is_absent"] = true;
        subjectObj["absentCheckSelected"] = true;
      }
      this.selectedSubjects.push(subjectObj);
      this.fourthFormGroup.controls["subject_id"].setValue(null);
      this.fourthFormGroup.controls["subject_marks"].setValue(null);
      this.fourthFormGroup.controls["subject_grade"].setValue(null);
      if (this.absentCheckSelected) {
        this.absentCheckSelected = false;
        this.fourthFormGroup.controls["absent_check"].setValue(false);
      }
      this.fourthFormGroup.controls["subject_marks"].enable();
      this.fourthFormGroup.controls["subject_grade"].enable();
    }
  }

  checkIfSubjectAlreadySelected(selectedSubjectId) {
    let count = this.selectedSubjects.filter(
      _ => _.subject_id == selectedSubjectId
    );
    return count.length > 0 ? true : false;
  }

  onBlurRollNumber() {
    this.thirdFormGroup.reset();
    this.fourthFormGroup.reset();
    this.absentCheckSelected = false;
    this.selectedSubjects = [];
  }

  onClickSubmitMarks() {
    if (this.allSubjects.length != this.selectedSubjects.length) {
      alert("Please enter marks for All Subjects.");
      return;
    }
    let payload = {
      roll_no: this.studentInfo["roll_no"],
      term: this.thirdFormGroup.controls["term"].value,
      marks: this.selectedSubjects
    };
    let confirmResult = confirm("Click OK to Proceed");
    if (confirmResult) {
      this._appService.insertStudentMarks(payload).subscribe((data: {}) => {
        if (null != data && data["status"] == 200) {
          alert(data["message"]);
        } else {
          alert(data["message"]);
        }
      });
    }
  }

  onClickRemoveSubjectFromList(subject) {
    let index = this.selectedSubjects.findIndex(
      _ => _.subject_id == subject.subject_id
    );
    if (index != -1) {
      this.selectedSubjects.splice(index, 1);
    }
  }
}
