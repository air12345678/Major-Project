import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailsprofile',
  templateUrl: './detailsprofile.component.html',
  styleUrls: ['./detailsprofile.component.css']
})
export class DetailsprofileComponent implements OnInit {
data
role
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.role=localStorage.getItem("user")
    this.route.queryParamMap.subscribe((d)=>{
      this.data = JSON.parse(d.get('user'));
      console.log(this.data)
})
  }

}
