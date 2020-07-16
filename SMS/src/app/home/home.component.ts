import { Component, OnInit } from '@angular/core';
declare var $:any;
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
    
      $('.card--part1').mouseover(function(){
        $('.card--part1').css({backgroundColor:'skyblue'},{duration:500})
      })
      .mouseout(function(){
        $('.card--part1').css({backgroundColor:'white'},{duration:500})
      })
        
        $(window).scroll(function(){
          $('.card--part1').animate({zoom:'1.2',},{duration:500,
          easing:"linear"})
        })
  
    })
  
  }
}
