import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-submitted-assignments',
  templateUrl: './submitted-assignments.component.html',
  styleUrls: ['./submitted-assignments.component.css']
})
export class SubmittedAssignmentsComponent implements OnInit {
assignment
role
searchterm:string
  constructor(private ds:DataService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.ds.getsubmittedassignment()
    .subscribe((d)=>{
      this.assignment = d.resultData
    })
  }
  delete(a){
    this.ds.deletesubmitassignment({_id:a._id})
    .subscribe((d)=>{
      if(d.status == "Ok"){
        this.ds.getsubmittedassignment()
        .subscribe((a)=>{
          this.assignment = a.resultData
        })
      }
    })
  }
}
