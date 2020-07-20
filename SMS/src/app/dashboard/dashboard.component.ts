import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { createstudent } from '../models/form-model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() curuser
role;
name;
datas;
profile;
Profile;
createstudents:createstudent;
  constructor(private router:Router, private ds:DataService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.name = localStorage.getItem("user");
    this.ds.getprofilepicture()
    .subscribe((d)=>{
      this.profile = d.resultData;
      this.ds.studentdetail({email:localStorage.getItem("email")})
      .subscribe((c)=>{
        this.profile = this.profile.filter((a)=>{
          return a.email == c.resultData[0].email
        })
      })
    })
    this.ds.getprofilepicture()
    .subscribe((d)=>{
      this.Profile = d.resultData;
      this.ds.teacherdetails({email:localStorage.getItem("email")})
      .subscribe((c)=>{
        this.Profile = this.Profile.filter((a)=>{
          return a.email == c.resultData[0].email
        })
      })
    })
  }
  logout(){
    localStorage.removeItem("user");
    
    this.router.navigate(['/login']);
  }
  
  }
