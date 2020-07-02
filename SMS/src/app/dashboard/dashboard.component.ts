import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { createstudent } from '../models/form-model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() curuser
role;
name;
datas;

createstudents:createstudent;
  constructor(private router:Router, private ds:DataService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.name = localStorage.getItem("user");
  }
  logout(){
    localStorage.removeItem("user");
    
    this.router.navigate(['/login']);
  }
  
  }
