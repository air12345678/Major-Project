import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { createstudent, createteacher } from '../models/form-model';

@Component({
  selector: 'app-completeprofile',
  templateUrl: './completeprofile.component.html',
  styleUrls: ['./completeprofile.component.css']
})
export class CompleteprofileComponent implements OnInit {
 createstudents:createstudent
 datas
 data
  role: string;
  createteachers:createteacher
  email
  constructor(private ds:DataService, private router:Router,
    private route:ActivatedRoute) { }

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

}
