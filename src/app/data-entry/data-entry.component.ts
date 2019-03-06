import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AppService } from '../app.service';

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
  selectedRollNo: any = "";
  studentInfo = null;
  showAddMarksSection = false;

  isLinear = false;
  isOptional = false;
  firstFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  absentCheckSelected = false;

  constructor(private _formBuilder: FormBuilder, private _appService: AppService) { }

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
      absent_check: [false]
    });

    this.classesList = [
      { id: "1", val: "Class I" },
      { id: "2", val: "Class II" },
      { id: "3", val: "Class III" },
      { id: "4", val: "Class IV" },
      { id: "5", val: "Class V" },
      { id: "6", val: "Class VI" },
      { id: "7", val: "Class VII" },
      { id: "8", val: "Class VIII" },
      { id: "9", val: "Class IX" },
      { id: "10", val: "Class X" }
    ];
    this.termsList = [
      { id: "termI", val: "Term I" },
      { id: "termII", val: "Term II" },
      { id: "termIII", val: "Term III" }
    ];
    this.allSubjects = [
      {
        subject_id: "mathematics",
        subject_label: "Mathematics"
      },
      {
        subject_id: "english",
        subject_label: "English"
      },
      {
        subject_id: "science",
        subject_label: "Science"
      }
    ];
  }

  getClassNameById(classId) {
    let index = this.classesList.filter(_ => _.id == classId);
    return index.length > 0 ? index[0]["val"] : classId;
  }

  onDropdownSelection() {
    this.selectedSession =
      this.selectedSession == null || this.selectedSession == undefined
        ? null
        : this.selectedSession;
    this.selectedClass =
      this.selectedClass == null || this.selectedClass == undefined
        ? null
        : this.selectedClass;
    if (null != this.selectedSession && null != this.selectedClass) {
      console.log("API CALL");
      // API Call here to fetch the data: Pending at Naina
      let payload = {
        session: this.selectedSession,
        class: this.selectedClass,
        subjects: this.selectedSubjects
      };
      this._appService.getProducts().subscribe((data: {}) => {
        debugger;
        console.log(data);
        this.showAddSubjectRow = true;
      });
    }


  }

  // onClickSubmit(action) {
  //   if (action == "GET_STU_INFO") {
  //     let payload = {
  //       student_roll_no: this.selectedRollNo
  //     };
  //     // API here : fetch student details
  //     this.studentInfo = {};
  //     this.studentInfo = {
  //       session: "2018-2019",
  //       roll_no: "9876",
  //       name: "Naina Jaiswal",
  //       class_name: "1"
  //     };
  //   } else if (action == "ADD_MARKS") {
  //     this.showAddMarksSection = true;
  //   }
  // }

  onClickAbsentBtn() {
    this.absentCheckSelected = !this.absentCheckSelected;
    if (this.absentCheckSelected) {
      this.fourthFormGroup.controls["subject_marks"].disable();
      this.fourthFormGroup.controls["subject_marks"].setValue(null);
    }
    else
      this.fourthFormGroup.controls["subject_marks"].enable();
  }

  onClickAddSubject() {
    let selectedSubjectId = this.fourthFormGroup.controls["subject_id"].value;
    let selectedSubjectMarks = this.fourthFormGroup.controls["subject_marks"]
      .value;
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
      this.selectedSubjects.push({
        subject_label: selectedSubject[0]["subject_label"],
        subject_id: selectedSubject[0]["subject_id"],
        subject_marks: this.absentCheckSelected
          ? "AB"
          : selectedSubjectMarks
      });
      this.fourthFormGroup.controls["subject_id"].setValue(null);
      this.fourthFormGroup.controls["subject_marks"].setValue(null);
      if (this.absentCheckSelected) {
        this.absentCheckSelected = false;
        this.fourthFormGroup.controls["absent_check"].setValue(false);
        this.fourthFormGroup.controls["subject_marks"].enable();
      }
    }
  }

  checkIfSubjectAlreadySelected(selectedSubjectId) {
    let count = this.selectedSubjects.filter(
      _ => _.subject_id == selectedSubjectId
    );
    return count.length > 0 ? true : false;
  }

  onBlurRollNumber() {
    let studentRollNo = this.firstFormGroup.controls['rollNumber'].value;
    // if (null != null == this.studentInfo.roll_no || studentRollNo != "" || (studentRollNo == this.studentInfo.roll_no)) {
    //   return;
    // }
    this.thirdFormGroup.reset();
    this.fourthFormGroup.reset();
    this.selectedSubjects = [];
    this._appService.getStudentDetails({roll_no:studentRollNo}).subscribe((data: {}) => {
      debugger;
      console.log(data);
      this.studentInfo = data['student_details'];
      this.showAddSubjectRow = true;
    });
  }
}
