import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createteacher } from '../models/form-model';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createteacher',
  templateUrl: './createteacher.component.html',
  styleUrls: ['./createteacher.component.css']
})
export class CreateteacherComponent implements OnInit {
  TeacherForm :FormGroup;
  createteacher:createteacher;
  submitted = false;
  constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { }

  ngOnInit(): void {
    this.TeacherForm = this.fb.group({
      id:['',Validators.required],
      name:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      contactno:['',Validators.required],
      gender:['',Validators.required],
      course:['',Validators.required],
      dateofbirth:['',Validators.required],
      address:['',Validators.required]
    });
  }
  get f() {
    return this.TeacherForm.controls;
  }
  onsubmit(){
    this.submitted = true;
    if (this.TeacherForm.invalid) {
      return;
  }
  this.createteacher = this.TeacherForm.value;
  this.ds.createTeacher(this.createteacher)
  .subscribe((d)=>{
    if(d.status =="Ok"){
      alert("Create Teacher Successfully");
      this.router.navigate(['/dashboard/viewteachers']);
    }
  })
  }
}
