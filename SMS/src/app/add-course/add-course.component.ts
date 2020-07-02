import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { addcourses } from '../models/form-model';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm :FormGroup;
  createcourse:addcourses
  submitted = false;
  constructor(private router:Router, private ds: DataService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      courseid:['',Validators.required],
      coursename:['',Validators.required],
      // teachername:['',Validators.required]
    });
  }
  get f() {
    return this.courseForm.controls;
  }
  submit(){
    this.submitted = true;
    if (this.courseForm.invalid) {
      return;
  }
  this.createcourse = this.courseForm.value;
  this.ds.addcourses(this.createcourse)
  .subscribe((d)=>{
    if(d.status=="Ok"){
      alert("Create Course Successfully");
      this.router.navigate(['/dashboard/viewcourse']);
    }
  })
  }
}
