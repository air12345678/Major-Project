import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
assignment
  constructor(private route: ActivatedRoute,private ds:DataService) { }

  ngOnInit(): void {
    this.ds.getassignments()
.subscribe((d)=>{
  this.assignment = d.resultData;
  console.log(this.assignment)
})

}
}
