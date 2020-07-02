import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { createstudent, Login, createteacher } from '../models/form-model';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
datas
createstudents:createstudent
login:Login
 createteachers:createteacher
  role;
  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.createstudents = new createstudent();
    this.createstudents.email = localStorage.getItem("email")
    this.ds.studentdetail(this.createstudents)
    .subscribe((c)=>{
        if(c.status=="Ok"){
          this.datas = c.resultData
          console.log(this.datas)
        }
    })
    this.createteachers = new createteacher();
    this.createteachers.email = localStorage.getItem("email")
   this.ds.teacherdetails(this.createteachers)
   .subscribe((d)=>{
     if(d.status=="Ok"){
       this.datas = d.resultData
       console.log(this.datas)
     }
   })
}
submit(){
 this.router.navigate(['/dashboard/completeprofile'])
}

 
}
