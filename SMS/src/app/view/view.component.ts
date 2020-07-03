import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { createstudent } from '../models/form-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
datas
index:number
role;
searchterm:string;
prop:string
createstudents:createstudent
studentForm :FormGroup;
createstudent:createstudent;
submitted = false;
  tobeupdated: any;
  email: string;
  constructor(private router:Router, 
    private ds:DataService,private fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.ds.getstudents()
    .subscribe((d)=>{
    this.datas = d.resultData;
      console.log(this.datas)
    
  })
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
}

get f() {
  return this.studentForm.controls;
}
update(s){
  this.tobeupdated={...s};
 }
onsubmit(){
  this.submitted = true;
  if (this.studentForm.invalid) {
    return;
}
this.ds.getupdate(this.tobeupdated)
.subscribe((d)=>{
  if(d.status="Ok"){
    this.ds.getstudents().subscribe((d)=>{
      this.datas =d.resultData;
    })
  }
})
alert("Update Student Successfully");
 this.router.navigate(['/dashboard/view']);
}
delete(d){
  this.ds.getpop({_id:d._id}).subscribe((s)=>{
    if(s.status = "Ok"){
  this.ds.getstudents().subscribe((d)=>{
    this.datas =d.resultData;
  })
    }
  })
}
details(d){
  this.createstudents = new createstudent();
  this.router.navigate(['/dashboard/detailsprofile'],
  {queryParams:{user:JSON.stringify(d)}})
}





}
