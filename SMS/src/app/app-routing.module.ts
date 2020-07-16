import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';

import { ViewComponent } from './view/view.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ProfileComponent } from './profile/profile.component';
import { CompleteprofileComponent } from './completeprofile/completeprofile.component';
import { AuthguardService } from './services/authguard.service';
import { CreateteacherComponent } from './createteacher/createteacher.component';
import { ViewteachersComponent } from './viewteachers/viewteachers.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ViewcourseComponent } from './viewcourse/viewcourse.component';
import { DetailsprofileComponent } from './detailsprofile/detailsprofile.component';
import { ChangeComponent } from './change/change.component';
import { UploadAssignmentComponent } from './upload-assignment/upload-assignment.component';
import { ViewAssignmentComponent } from './view-assignment/view-assignment.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SubmitAssignmentComponent } from './submit-assignment/submit-assignment.component';
import { SubmittedAssignmentsComponent } from './submitted-assignments/submitted-assignments.component';
import { UsersComponent } from './users/users.component';
import { LoginDetailsComponent } from './login-details/login-details.component';




const routes: Routes = [
      {path:'',component:HomeComponent},
      {path:'about',component:AboutComponent},
      {path:'contactus',component:ContactusComponent},
      {path:'login',component:LoginComponent},
      {path:'change',component:ChangeComponent},
      {path:'forgot-password',component:ForgotPasswordComponent},
      {path:'dashboard',component:DashboardComponent,
    children:[
      {path:'create-student',component:CreateStudentComponent,canActivate:[AuthguardService]},
      {path:'createteacher',component:CreateteacherComponent,canActivate:[AuthguardService]},
      {path:'view',component:ViewComponent,canActivate:[AuthguardService]},
      {path:'viewteachers',component:ViewteachersComponent,canActivate:[AuthguardService]},
      {path:'profile',component:ProfileComponent},
      {path:'completeprofile',component:CompleteprofileComponent},
      {path:'add-course',component:AddCourseComponent},
      {path:'viewcourse',component:ViewcourseComponent},
      {path:'detailsprofile',component:DetailsprofileComponent,canActivate:[AuthguardService]},
      {path:'upload-assignment',component:UploadAssignmentComponent},
      {path:'view-Assignment',component:ViewAssignmentComponent},
      {path:'submit-assignment',component:SubmitAssignmentComponent},
      {path:'submitted-assignment',component:SubmittedAssignmentsComponent},
      {path:'users',component:UsersComponent},
      {path:'login-details',component:LoginDetailsComponent}
      
      
      
]  }  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
