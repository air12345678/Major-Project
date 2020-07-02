import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-viewcourse',
  templateUrl: './viewcourse.component.html',
  styleUrls: ['./viewcourse.component.css']
})
export class ViewcourseComponent implements OnInit {
datas
  constructor(private ds:DataService) { }

  ngOnInit(): void {
    this.ds.getcourses()
    .subscribe((d)=>{
      if(d.status == "Ok"){
        this.datas = d.resultData;
        console.log(this.datas)
      }
    })
  }
delete(d){
  this.ds.deletecourse(d)
  .subscribe((c)=>{
    if(c.status == "Ok"){
      this.ds.getcourses()
      .subscribe((d)=>{
        this.datas = d.resultData;
      })
      
    }
  })
}
}
