import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import {  Signup, Login, createstudent } from '../models/form-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var document:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

@ViewChild('mydiv')sgnp;
login:Login
signup:Signup
createstudent:createstudent
submitted = false;
loginForm:FormGroup;
signupForm:FormGroup;
//---------------For signup---------------------//
formerrors ={
  'name':'',
  'email':'',
  'password':'',
  'role':''
}
ValidationMessage ={
  'name':{
   'required':'Name is required',
  },
  'email':{
    'required':'Email is required.',
    'email':'Email not in valid format.'
  },
  'password':{
    'required':'Password is required',
    'minlength':'Password should be at least 6 character long'
  },
  'role':{
    'required':'Role is required'
  }
}
//-----------------------for SignIn---------------------------//
formErrors ={
  'email':'',
  'password':''
};
validationMessages = {
  'email':{
    'required':'Email is required.',
    'email':'Email not in valid format.'
  },
  'password':{
    'required':'Password is required',
    'minlength':'Password should be at least 6 character long'
  }
}
  constructor(private ds:DataService, private router:Router,
    private fb:FormBuilder) { 
      this.signinform();
      this.signupform();
    }

  ngOnInit(): void {
  }
  signupform(){
    this.signupForm = this.fb.group({
      name:['',Validators.required],
     email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      role:['',Validators.required]
    });
    this.signupForm.valueChanges
    .subscribe(data => this.OnValueChanged(data));
    this.OnValueChanged();
  }
  signinform(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    });
    this.loginForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
roles=['Admin','Student','Teacher']
  OnValueChanged(data?:any){
    if(!this.signupForm){return;}
    const form = this.signupForm;
    for(const field in this.formerrors){
      if(this.formerrors.hasOwnProperty(field)){
        this.formerrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const message = this.ValidationMessage[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formerrors[field]+= message[key] + '';
            }
          }
        }
      }
    }
  }

  onValueChanged(data?:any){
    if(!this.loginForm){return;}
    const form = this.loginForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const message = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+= message[key] + '';
            }
          }
        }
      }
    }
  }

  onSubmit(){
    this.login = this.loginForm.value;
    this.ds.login(this.login)
    .subscribe((d)=>{
      if(d.status == "Ok"){
        console.log(d.resultData)
        localStorage.setItem("user",d.resultData[0].name);
        localStorage.setItem("role",d.resultData[0].role);
        localStorage.setItem("email",d.resultData[0].email);
        this.router.navigate(['/dashboard/profile']);
      
     }
      else{
        alert("Invalid ID/Password")
      }
    })
  }
  onSignup(){
    this.signup = this.signupForm.value;
    this.ds.signup(this.signup)
    .subscribe((d)=>{
      if(d.Status == "Ok"){
        alert("Signup Successfully");
        console.log(this.sgnp);
        this.sgnp.nativeElement.click()
        // this.router.navigate(['/']);
      }
      else{
        alert(d.resultData);
      }
    })
  }
  ngAfterViewInit()
  {
      const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });
    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }
  
}