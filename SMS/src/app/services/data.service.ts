import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Signup, Login, createstudent, createteacher, addcourses, contactusdetails } from '../models/form-model';
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
  contactus_info(var_ob:contactusdetails):any
  {
    console.log("hey there", var_ob);
    return this.http.post("http://localhost:3000/contactus",var_ob)
  }
  createStudent(c:createstudent):any{
    return this.http.post("http://localhost:3000/create-student",c);
  }

studentdetail(c):any{
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
teacherdetails(c):any{
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
postDataWithImage(d)
{
  return this.http.post('http://localhost:3000/data-with-file', d);
}
postprofile(p){
  return this.http.post('http://localhost:3000/post-profile',p);
}
getassignments():any{
  return this.http.get('http://localhost:3000/get-assignments');
}
getprofilepicture():any{
  return this.http.get('http://localhost:3000/getprofile');
}
forgotpassword(d:Login):any{
  return this.http.post('http://localhost:3000/forgot-password',d);
}
deleteassignment(d):any{
  return this.http.post('http://localhost:3000/delete-assignment',d);

}
submitassignment(d):any{
  return this.http.post('http://localhost:3000/Submit-assignment', d);
}
getsubmittedassignment():any{
  return this.http.get('http://localhost:3000/submitted-assignments');
}
deletesubmitassignment(d):any{
  return this.http.post('http://localhost:3000/delete-submit-assignment', d);
}
users():any{
  return this.http.get('http://localhost:3000/users');
}
deleteuser(d):any{
  return this.http.post('http://localhost:3000/delete-user',d);
}
userdetails(u):any{
  return this.http.post('http://localhost:3000/userdetails',u);

}
userupdate(u):any{
  return this.http.post('http://localhost:3000/user-update',u);
}
}
