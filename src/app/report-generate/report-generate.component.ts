import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { AppService } from "../app.service";

@Component({
  selector: "app-report-generate",
  templateUrl: "./report-generate.component.html",
  styleUrls: ["./report-generate.component.scss"]
})
export class GenerateReportComponent implements OnInit {
  selectedClass = null;
  selectedSession = null;
  classesList = [];
  termsList = [];
  showAddSubjectRow = false;
  studentReportForm: FormGroup;

  constructor(private _appService: AppService, private _formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.studentReportForm = this._formBuilder.group({
      session: ["", Validators.required],
      class_name: ["", Validators.required],
      roll_no: ["", Validators.required],
      term: ["", Validators.required],
      conduct: ["", Validators.required],
      no_of_present_days: ["", Validators.required],
      total_no_of_days: ["", Validators.required],
      remarks: ["", Validators.required],
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
      { id: "1", val: "Term I" },
      { id: "2", val: "Term II" },
      { id: "3", val: "Term III" }
    ];
  }

  onClickSubmit() {
    if (!this.studentReportForm.valid) {
      return;
    }
    debugger;
    let payload = {
      session: this.studentReportForm.controls['session'].value,
      class_name: this.studentReportForm.controls['class_name'].value,
      roll_no: this.studentReportForm.controls['roll_no'].value,
      term: this.studentReportForm.controls['term'].value,
      conduct: this.studentReportForm.controls['conduct'].value,
      no_of_present_days: this.studentReportForm.controls['no_of_present_days'].value,
      total_no_of_days: this.studentReportForm.controls['total_no_of_days'].value,
      remarks: this.studentReportForm.controls['remarks'].value,
    }
    this._appService.getStudentReport(payload).subscribe((data: {}) => {
      if (null != data && data['status'] == 200) {
        alert(data['message']);
        // event.stopPropagation();
        // var exportReportUrl = this._reportService.getExportReportUrl(
        //   report["documentId"]
        // );
        // const iframeElment = document.createElement("iframe");
        // iframeElment.src = exportReportUrl;
        // iframeElment.style.display = "none";
        // document.body.appendChild(iframeElment);
        this.resetForm();
      }
    });
  }

  resetForm() {
    this.studentReportForm.reset();
  }

}
