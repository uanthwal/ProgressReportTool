import { Component, OnInit } from "@angular/core";
import { APP_CONFIG } from "../app.config";
import { Router } from "@angular/router";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    adminIcon: any;
    dataEntryIcon: any;
    reportGenIcon: any;
    constructor(private router: Router) {
        this.adminIcon = APP_CONFIG.ADMIN_ICON;
        this.dataEntryIcon = APP_CONFIG.DATA_ENTRY_ICON;
        this.reportGenIcon = APP_CONFIG.REPORT_GENERATE_ICON;
    }

    ngOnInit() { }

    onClickIcon(iconClicked?) {
        if (iconClicked == "ADMIN") {
            this.router.navigate(["/admin"]);
        } else if (iconClicked == "DATA_ENTRY") {
            this.router.navigate(["/data-entry"]);
        } else if (iconClicked == "REPORT_GENERATE") {
            this.router.navigate(["/generate-report"]);
        }
    }
}
