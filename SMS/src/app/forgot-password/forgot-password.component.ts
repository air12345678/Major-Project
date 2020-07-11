import { Component, OnInit } from '@angular/core';
import { Login } from '../models/form-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
login:Login
forgotpassForm:FormGroup
submitted = false;
  constructor(private ds:DataService, private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
this.forgotpassForm = this.fb.group({
   email:['',[Validators.required,Validators.email]]
})
  }
  get f() {
    return this.forgotpassForm.controls;
  }
  onsubmit(){

    this.router.navigate(['/forgot-password'])
    this.submitted = true;
    if (this.forgotpassForm.invalid) {
      return;
  }
    this.login = this.forgotpassForm.value;
    this.ds.forgotpassword(this.login)
    .subscribe((d)=>{
      if(d.Status == "Ok"){
        // alert(JSON.stringify(d.resultData));
        alert("Open your email account and check the password");
      }
      else{
        
        alert("Please Enter Valid Email Address")
      }
    })
  }
}
