import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";
import { DataEntryComponent } from "./data-entry/data-entry.component";
import { AppRoutingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    DataEntryComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatSelectModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
