import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { GenerateReportComponent } from './report-generate/report-generate.component';
import { AddStudentComponent } from './add-student/add-student.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'data-entry', component: DataEntryComponent },
    { path: 'generate-report', component: GenerateReportComponent },
    { path: 'add-student', component: AddStudentComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }