export class Signup{
    name:string;
    email:string;
    password:string;
    role:string;
}
export class Login{
    email:string;
    password:string;
}

export class contactusdetails{
    name:string;
    email:string;
    subject:string;
    message:string;
}

export class createstudent{
    id:string;
    name:string;
    fathername:string;
    email:string;
    contactno:string;
    gender:string;
    branch:string;
    course:string;
    teachername:string;
    dateofbirth:Date;
    address:string;
}

export class createteacher{
    id:string;
    name:string;
    email:string;
    contactno:string;
    gender:string;
    course:string;
    dateofbirth:Date;
    address:string;
}

export class addcourses{
    courseid:string;
    coursename:string;
    teachername:string;
}

export class change{
    email:string;
    password:string;
    confirmpassword:string;
}