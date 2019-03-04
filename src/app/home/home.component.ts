import { Component, OnInit } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    adminIcon: any;
    dataEntryIcon: any;
    constructor(private router: Router) {
        this.adminIcon = APP_CONFIG.ADMIN_ICON
        this.dataEntryIcon = APP_CONFIG.DATA_ENTRY_ICON;
    }

    ngOnInit() {
    }

    onClickIcon(iconClicked?) {
        if (iconClicked == "ADMIN") {
            this.router.navigate(["/admin"]);
        } else {
            this.router.navigate(["/data-entry"]);
        }
    }

}