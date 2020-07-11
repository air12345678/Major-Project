import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $;
@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css']
})
export class ViewAssignmentComponent implements OnInit {
  assignment
  datas
  data
  
  constructor(private ds:DataService,private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
   
this.ds.getassignments()
.subscribe((d)=>{
  this.assignment = d.resultData;
  console.log(this.assignment)
})
 this.ds.getstudents()
 .subscribe((c)=>{
   this.datas = c.resultData;
   console.log(this.datas)
 })
 

  if(this.assignment[0].courseid == this.datas.courseid){
    location.reload()
  }
 
}
}
