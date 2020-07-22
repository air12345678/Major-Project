import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { createstudent, Login, createteacher } from '../models/form-model';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
declare var $:any;

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
  name;
  email
  Profile
  ext
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
getprofile(e){
  this.Profile = e.target.files[0];
  this.ext = this.Profile.name.split('.').pop()
}
 postData(){
  var form = new FormData();
  form.set('name',this.name);
  form.set('email',this.email);
  form.set('ext',this.ext);
  form.set('Profile',this.Profile);
  this.ds.postprofile(form)
  .subscribe((d)=>{
    alert("Profile Picture Uploaded Successfully");
  })
 }
 ngAfterViewInit(){
  $(document).ready(function() {

    
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
    

    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });
});
 }
}
