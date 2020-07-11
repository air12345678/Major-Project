import { Component, OnInit } from '@angular/core';
declare var $:any;
declare var Waypoint :any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    $(document).ready(function(){
    $('.card--part1').scroll(function(){
      $('.card--part1').animate({left: '250px'});
    })
    })
  }
}
