import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { AppService } from "../app.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.scss"]
})
export class AddStudentComponent implements OnInit {
  selectedClass = null;
  selectedSession = null;
  classesList = [];
  termsList = [];
  showAddSubjectRow = false;
  addStudentForm: FormGroup;

  constructor(private _appService: AppService, private _formBuilder: FormBuilder, private _router: Router) { }

  ngOnInit() {
    this.addStudentForm = this._formBuilder.group({
      session: ["", Validators.required],
      class_name: ["", Validators.required],
      roll_no: ["", Validators.required],
      student_name: ["", Validators.required],
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
  }

  onClickSubmit() {
    if (!this.addStudentForm.valid) {
      return;
    }
    let payload = {
      session: this.addStudentForm.controls['session'].value,
      class_name: this.addStudentForm.controls['class_name'].value,
      roll_no: this.addStudentForm.controls['roll_no'].value,
      student_name: this.addStudentForm.controls['student_name'].value
    }
    this._appService.addStudentInfo(payload).subscribe((data: {}) => {
      if (null != data && data['status'] == 200) {
        alert(data['message']);
        this._router.navigate(['/home']);
      } else {
        alert(data['message']);
      }
    });
  }

  resetForm() {
    this.addStudentForm.reset();
  }

}
