import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-assignment',
  templateUrl: './upload-assignment.component.html',
  styleUrls: ['./upload-assignment.component.css']
})
export class UploadAssignmentComponent implements OnInit {
datas
prop:string
assignment
courseid
description
ext
  constructor(private ds:DataService,private router:Router) { }

  ngOnInit(): void {
   
    this.ds.getcourses()
    .subscribe((d)=>{
      if(d.status == "Ok"){
        this.datas = d.resultData;
      }
    })
  }

  getAssignment(e){
    this.assignment = e.target.files[0];
    this.ext = this.assignment.name.split('.').pop()
  }
  postData(){
   var form = new FormData();
   form.set('courseid',this.courseid);
   
   form.set('description',this.description);
   form.set('ext',this.ext);
   form.set('assignment',this.assignment);
   this.ds.postDataWithImage(form)
   .subscribe((d)=>{
    alert(JSON.stringify(d))
   })
  
  
 }

}
