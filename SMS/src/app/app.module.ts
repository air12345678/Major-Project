import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { CompleteprofileComponent } from './completeprofile/completeprofile.component';
import { CreateteacherComponent } from './createteacher/createteacher.component';
import { ViewteachersComponent } from './viewteachers/viewteachers.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AddCourseComponent } from './add-course/add-course.component';
import { ViewcourseComponent } from './viewcourse/viewcourse.component';
import { DetailsprofileComponent } from './detailsprofile/detailsprofile.component'
import { ChangeComponent } from './change/change.component';
import { FilterTeacherPipe } from './pipes/filter-teacher.pipe';
import { UploadAssignmentComponent } from './upload-assignment/upload-assignment.component';
import { ViewAssignmentComponent } from './view-assignment/view-assignment.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SubmitAssignmentComponent } from './submit-assignment/submit-assignment.component';
import { SubmittedAssignmentsComponent } from './submitted-assignments/submitted-assignments.component';
import { FilterAssignmentPipe } from './pipes/filter-assignment.pipe';
import { UsersComponent } from './users/users.component';
import { LoginDetailsComponent } from './login-details/login-details.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    AboutComponent,
    ContactusComponent,
    ViewComponent,
    CreateStudentComponent,
    ProfileComponent,
    CompleteprofileComponent,
    CreateteacherComponent,
    ViewteachersComponent,
    FilterPipe,
    AddCourseComponent,
    ViewcourseComponent,
    DetailsprofileComponent,
    ChangeComponent,
    FilterTeacherPipe,
    UploadAssignmentComponent,
    ViewAssignmentComponent,
    ForgotPasswordComponent,
    SubmitAssignmentComponent,
    SubmittedAssignmentsComponent,
    FilterAssignmentPipe,
    UsersComponent,
    LoginDetailsComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
