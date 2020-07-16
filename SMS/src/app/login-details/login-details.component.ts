import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Signup } from '../models/form-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.css']
})
export class LoginDetailsComponent implements OnInit {
datas
signup:Signup
studentForm:FormGroup
roles=['Admin','Student','Teacher']
tobeupdated
submitted = false;
  constructor(private ds:DataService, private fb:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
  this.ds.userdetails({email:localStorage.getItem("email")})
  .subscribe((c)=>{
    if(c.status=="Ok"){
      this.datas = c.resultData
   console.log(this.datas)
      
    }
  })
  this.studentForm = this.fb.group({
    name:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required],
    role:['',Validators.required]
  })
  }
  get f() {
    return this.studentForm.controls;
  }
  update(s){
    this.tobeupdated = {...s}
  }
  onsubmit(){
     this.submitted = true;
     if (this.studentForm.invalid) {
      return;
  }
  this.ds.userupdate(this.tobeupdated)
  .subscribe((d)=>{
    if(d.status == "Ok"){
      this.ds.userdetails({email:localStorage.getItem("email")})
       .subscribe((c)=>{
         this.datas = c.resultData
       })
    }
    
  })
  alert("Update Student Successfully");
 this.router.navigate(['/dashboard/login-details'])
  }
}
