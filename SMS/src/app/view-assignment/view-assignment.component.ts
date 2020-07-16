import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css']
})
export class ViewAssignmentComponent implements OnInit {
  assignment
  datas
  data
  courseid;
 role
 searchterm
  constructor(private ds:DataService,private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
this.ds.getassignments()
.subscribe((d)=>{
  this.assignment = d.resultData;
  // alert(JSON.stringify(this.assignment))
  // alert(localStorage.getItem("email"))
  this.ds.studentdetail({email:localStorage.getItem("email")}).
  subscribe((c)=>{
    // alert(JSON.stringify(c))
    this.assignment = this.assignment.filter((a)=>{
      return a.courseid == c.resultData[0].courseid
    })
  })
})


 
}
delete(d){
  this.ds.deleteassignment({_id:d._id})
  .subscribe((c)=>{
    if(c.status =="Ok"){
      this.ds.getassignments()
      .subscribe((a=>{
          this.assignment = a.resultData;
      }))
    }
  })
}
}
