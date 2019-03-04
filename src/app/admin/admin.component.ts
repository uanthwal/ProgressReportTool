import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: "app-admin",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
    selectedClass = null;
    selectedSession = null;
    classesList = [];
    showAddSubjectRow = false;
    adminForm = new FormGroup({
        session: new FormControl(),
        class: new FormControl(),
        subject_id: new FormControl(),
        subject_type: new FormControl()
    });
    allSubjects = [];
    selectedSubjects = [];
    constructor() { }

    ngOnInit() {
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
            }
            

            this.showAddSubjectRow = true;
        }
    }

    onClickAddSubject() {
        let selectedSubjectId = this.adminForm.controls["subject_id"].value;
        let selectedSubjectType = this.adminForm.controls["subject_type"].value;
        if (null != selectedSubjectId && null != selectedSubjectType) {
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
                subject_id: selectedSubject[0]["subject_id"],
                subject_type: selectedSubjectType,
                subject_label: selectedSubject[0]["subject_label"]
            });
            this.adminForm.controls["subject_id"].setValue(null);
            this.adminForm.controls["subject_type"].setValue(null);
        }
    }

    checkIfSubjectAlreadySelected(selectedSubjectId) {
        let count = this.selectedSubjects.filter(
            _ => _.subject_id == selectedSubjectId
        );
        return count.length > 0 ? true : false;
    }

    onClickRemoveSubjectFromList(subject) {
        let index = this.selectedSubjects.findIndex(
            _ => _.subject_id == subject.subject_id
        );
        if (index != -1) {
            this.selectedSubjects.splice(index, 1);
        }
    }

    onClckSubmit() {
        let payload = {
            session: this.selectedSession,
            class: this.selectedClass,
            subjects: this.selectedSubjects
        }

    }
}
