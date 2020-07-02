import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Signup, Login, createstudent, createteacher, addcourses } from '../models/form-model';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  
  signup(f:Signup):any{
    return this.http.post('http://localhost:3000/sign-up',f);
  }
  login(l:Login):any{
  return this.http.post('http://localhost:3000/login',l);
  }
  contactus_info(var_ob):any
  {
    console.log("hey there", var_ob);
    return this.http.post("http://localhost:3000/contactus",var_ob)
  }
  sendEmail(info):any
  {
    console.log("send mail", info);
    return this.http.post("http://localhost:3000/email",info);  
  }
  createStudent(c:createstudent):any{
    return this.http.post("http://localhost:3000/create-student",c);
  }

studentdetail(c:createstudent):any{
  return this.http.post("http://localhost:3000/studentdetail",c);
}
getstudents():any{

  return this.http.get("http://localhost:3000/getstudents");
}
getpop(u):any{
 
  return this.http.post('http://localhost:3000/delete-student',u);

}
getupdate(t):any{

  return this.http.put('http://localhost:3000/update-student',t);
}
createTeacher(c:createteacher):any{
  return this.http.post('http://localhost:3000/create-teacher',c);
}
getteachers():any{
  return this.http.get("http://localhost:3000/getteachers");
}
teacherdetails(c:createteacher):any{
  return this.http.post("http://localhost:3000/teacherdetail",c);
}
deleteteacher(u):any{
  return this.http.post('http://localhost:3000/delete-teacher',u);
}
updateteacher(t):any{
  return this.http.put('http://localhost:3000/update-teacher',t);
}
addcourses(a:addcourses):any{
  return this.http.post('http://localhost:3000/addcourse',a);
}
getcourses():any{
  return this.http.get('http://localhost:3000/getcourse');
}
deletecourse(u):any{
  return this.http.post('http://localhost:3000/deletecourse',u);
}

}
