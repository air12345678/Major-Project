import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
datas
  constructor(private ds:DataService) { }

  ngOnInit(): void {
    this.ds.users()
    .subscribe((d)=>{
      if(d.status=="Ok"){
        this.datas = d.resultData;
      }
    })
  }
 delete(u){
   this.ds.deleteuser({_id:u._id})
   .subscribe((d)=>{
     if(d.status=="Ok"){
       this.ds.users()
       .subscribe((data)=>{
         this.datas = data.resultData
       })
     }
   })
 }
}
