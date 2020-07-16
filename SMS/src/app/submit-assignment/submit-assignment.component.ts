import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-submit-assignment',
  templateUrl: './submit-assignment.component.html',
  styleUrls: ['./submit-assignment.component.css']
})
export class SubmitAssignmentComponent implements OnInit {
datas
assignment
ext
name
courseid
  constructor(private ds:DataService) { }

  ngOnInit(): void {
    this.ds.getcourses()
    .subscribe((d)=>{
      this.datas = d.resultData
    })
  }
 postAssignment(e){
  this.assignment = e.target.files[0];
  this.ext = this.assignment.name.split('.').pop()
 }
 postData(){
  var form = new FormData();
  form.set('name',this.name);
   form.set('courseid',this.courseid);
   form.set('ext',this.ext);
   form.set('assignment',this.assignment);
   this.ds.submitassignment(form)
   .subscribe((d)=>{
    alert("Assignment Submitted Successfully")
   })
 }
}
