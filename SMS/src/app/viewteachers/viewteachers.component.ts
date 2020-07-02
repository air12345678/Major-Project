import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-viewteachers',
  templateUrl: './viewteachers.component.html',
  styleUrls: ['./viewteachers.component.css']
})
export class ViewteachersComponent implements OnInit {
  datas: any;
  TeacherForm:FormGroup;
  submitted = false;
  tobeupdated: any;
  searchTerm:string
  constructor(private ds:DataService, private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.ds.getteachers()
    .subscribe((d)=>{
    this.datas = d.resultData;
      console.log(this.datas)
  })
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
update(s){
 this.tobeupdated = {...s}
}
delete(d){
this.ds.deleteteacher({_id:d._id})
.subscribe((d)=>{
  if(d.status =="Ok"){
    this.ds.getteachers()
    .subscribe((d)=>{
      this.datas = d.resultData;
      console.log(this.datas)
    })
  }
})
}
onsubmit(){
  this.submitted = true;
  if (this.TeacherForm.invalid) {
    return;
    
}
this.ds.updateteacher(this.tobeupdated)
.subscribe((d)=>{
  if(d.status =="Ok"){
    this.ds.getteachers()
    .subscribe((d)=>{
    this.datas = d.resultData;
      console.log(this.datas)
  })
  }
})
alert("Update Teacher Successfully");
 this.router.navigate(['/dashboard/viewteachers']);
}
}
