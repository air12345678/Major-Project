import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { contactusdetails } from '../models/form-model';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactus_ob = new contactusdetails();
  constructor(private ds:DataService) { }

  ngOnInit(): void {
  }
submit(){
  this.ds.contactus_info(this.contactus_ob)
  .subscribe((data)=>{
    if(data.status == "Ok")
    {
      alert("contactus succesfully");
      this.ds.sendEmail(this.contactus_ob).subscribe((data)=>
      {
        console.log(data);
      })
      alert("Email sent");
    }
    else{
      alert("contactus failed");
    }
  })
}

}
