import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createstudent, addcourses } from '../models/form-model';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
datas:any
  studentForm :FormGroup;
  createstudent:createstudent;
  submitted = false;
  createcourse:addcourses
  constructor(private fb:FormBuilder,private ds:DataService,private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      id:['',Validators.required],
      name:['',Validators.required],
      fathername:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      contactno:['',Validators.required],
      gender:['',Validators.required],
      branch:['',Validators.required],
      course:['',Validators.required],
      batchname:['',Validators.required],
      dateofbirth:['',Validators.required],
      address:['',Validators.required]
    });
    this.ds.getcourses()
    .subscribe((d)=>{
      if(d.status == "Ok"){
        this.datas = d.resultData;
      }
    })
    
  }
  get f() {
    return this.studentForm.controls;
  }
  onsubmit(){
    this.submitted = true;
    if (this.studentForm.invalid) {
      return;
  }
  this.createstudent = this.studentForm.value;
  this.ds.createStudent(this.createstudent)
  .subscribe((d)=>{
    if(d.status == "Ok"){
      alert("Create Student Successfully");
      this.router.navigate(['/dashboard/view']);
    }
  })
  }
}
