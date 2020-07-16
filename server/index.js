var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');
var multer = require('multer');
var fs = require('fs');
const path = require('path');

var storage = multer.diskStorage({
  destination:function(req,file,cb){
    console.log("in destination");
    cb(null, 'uploads')
  },
  filename:function(req,file,cb){
    console.log(file);
    var ext = file.originalname.split('.').pop();
    console.log(ext);
   console.log("line 21" );
   console.log(req.body)
    if(!req.hasTextDataProcessed){
      var collection = connection.db('smsdb').collection('assignments');
      collection.insert(req.body,(err,r)=>{
        if(!err){
          console.log(r);
          var insertedId = r.insertedIds['0'];
          
          console.log("inserted id is returned as->"+insertedId)
          req.hasTextDataProcessed = true;
          req.insertedId = insertedId; 
          
          req.assignmentCtr = 1;
          cb(null,req.insertedId+"_"+file.fieldname+"_"+req[file.fieldname+'Ctr']++ +"."+ext);
         console.log(req.courseid)
        }
        else{
          return null;
        }
      })
    }
    else{
      cb(null,req.insertedId+"_"+file.fieldname+"_"+req[file.fieldname+'Ctr']++ +"."+ext);
    }
  }
})

var storage1 = multer.diskStorage({
  destination:function(req,file,cb){
    console.log("in destination");
    cb(null, 'Submit')
  },
  filename:function(req,file,cb){
    console.log(file);
    var ext = file.originalname.split('.').pop();
    console.log(ext);
   console.log(req.body)
    if(!req.hasTextDataProcessed){
      var collection = connection.db('smsdb').collection('submitassignments');
      collection.insert(req.body,(err,r)=>{
        if(!err){
          console.log(r);
          var insertedId = r.insertedIds['0'];
          
          console.log("inserted id is returned as->"+insertedId)
          req.hasTextDataProcessed = true;
          req.insertedId = insertedId; 
          
          req.assignmentCtr = 1;
          cb(null,req.insertedId+"_"+file.fieldname+"_"+req[file.fieldname+'Ctr']++ +"."+ext);
         console.log(req.courseid)
        }
        else{
          return null;
        }
      })
    }
    else{
      cb(null,req.insertedId+"_"+file.fieldname+"_"+req[file.fieldname+'Ctr']++ +"."+ext);
    }
  }
})
var upload = multer({storage:storage})
var upload1 = multer({storage:storage1})
var app = express();
app.use(cors());
app.use(express.static(path.join(__dirname,'uploads')))
app.use(express.static(path.join(__dirname,'Submit')))
// //////////////////DataBase Conncetion///////////////////////////////////////
let client = new MongoClient("mongodb://localhost:27017/smsdb",{useNewurlParser:true});
var connection;
client.connect((err,con)=>{
  if(!err){
      console.log("Database connected Successfully");
      connection = con;
  }
  else{
      console.log("Database chould not be connected");
  }
});
// //////////////////End of DataBase Conncetion///////////////////////////////////////
app.get('/',(req,res)=>{
    res.send("Hello From Server");
})
app.post('/data-with-file',
upload.fields([{name:'assignment',maxcount:1}]),
                            
(req,res)=>{
  console.log("in last"); 
  res.send({status:"ok"})   
  });

  app.post('/Submit-assignment',
upload1.fields([{name:'assignment',maxcount:1}]),
                            
(req,res)=>{
  console.log("in last"); 
  res.send({status:"ok"})   
  });
app.get('/get-assignments',(req,res)=>{
  // console.log(req.body);
  var collection=connection.db('smsdb').collection('assignments');
  collection.find().toArray((err,docs)=>{
      if(!err)
      {
          res.send({Status:"Ok",resultData:docs});
        
      }
      else
      {
          res.send({Status:"failed",resultData:err});
      }
  })
})
app.get('/submitted-assignments',(req,res)=>{
  // console.log(req.body);
  var collection=connection.db('smsdb').collection('submitassignments');
  collection.find().toArray((err,docs)=>{
      if(!err)
      {
          res.send({Status:"Ok",resultData:docs});
        
      }
      else
      {
          res.send({Status:"failed",resultData:err});
      }
  })
})
app.post('/delete-assignment',bodyparser.json(), (req,res)=>{
  console.log(req.body);
  var collection =connection.db('smsdb').collection('assignments');
collection.remove({_id:ObjectId(req.body._id)},(err,r)=>{
  if(!err){
      res.send({status:"Ok"});
  }
  else{
      res.send({status:"failed"});
  }
})
})
app.post('/delete-submit-assignment',bodyparser.json(), (req,res)=>{
  console.log(req.body);
  var collection =connection.db('smsdb').collection('submitassignments');
collection.remove({_id:ObjectId(req.body._id)},(err,r)=>{
  if(!err){
      res.send({status:"Ok"});
  }
  else{
      res.send({status:"failed"});
  }
})
})
app.post('/sign-up',bodyparser.json(),(req,res)=>{
    console.log(req.body);
    
    var collection =connection.db('smsdb').collection('users');
    collection.find({email:req.body.email}).toArray((err,docs)=>{
      if(!err && docs.length>0)
      {
          res.send({Status:"failed",resultData:"Email Already Registered"});
      }
      else
      {
      collection.insert(req.body,(err,r)=>{
      if(!err)
      {
        sendMail("kkgupta221997@gmail.com", "ijcnsdglzlkujfgr" ,req.body.email, "Student Portal Signup Successfully", `<h3>Hi</h3><br><h6>Congratulations your sign up is successful on Student Portal.</h6>` )
          res.send({Status:"Ok"});
      }
      else
      {
          res.send({Status:"failed"});
      }
  })
      }
  })
   
})
app.post('/login',bodyparser.json(), (req,res)=>{
    var collection =connection.db('smsdb').collection('users');
    var query = {email:req.body.email, password:req.body.password}
    console.log(req.body);
    
    collection.find(query).toArray((err,docs)=>{
        if(!err && docs.length > 0){
            console.log(docs)
            res.send({status:"Ok",resultData:docs})
        }
        else{
            res.send({status:"failed",resultData:err})
        }
       
    })
})
app.get('/users',bodyparser.json(),(req,res)=>{
  var collection =connection.db('smsdb').collection('users');
  collection.find().toArray((err,docs)=>{
    if(!err && docs.length > 0){
      console.log(docs)
      res.send({status:"Ok",resultData:docs})
  }
  else{
      res.send({status:"failed",resultData:err})
  }
  })
})
app.post('/delete-user',bodyparser.json(), (req,res)=>{
  console.log(req.body);
  var collection =connection.db('smsdb').collection('users');
collection.remove({_id:ObjectId(req.body._id)},(err,r)=>{
  if(!err){
      res.send({status:"Ok"});
  }
  else{
      res.send({status:"failed"});
  }
})
})
app.post('/userdetails',bodyparser.json(), (req,res)=>{
  var collection =connection.db('smsdb').collection('users');
  var query = {email:req.body.email}
  console.log(req.body);
  collection.find(query).toArray((err,docs)=>{
      if(!err && docs.length > 0){
          console.log(docs)
          res.send({status:"Ok",resultData:docs})
      }
      else{
          res.send({status:"failed",resultData:err})
      }
     
  })
})
app.post('/user-update',bodyparser.json(),(req,res)=>{
  var collection =connection.db('smsdb').collection('users');
  collection.update({_id:ObjectId(req.body._id)},{$set:{name:req.body.name,
  email:req.body.email,password:req.body.password,role:req.body.role}},(err,r)=>{
    if(!err){
      res.send({status:"Ok"})
      console.log("Document Updated");
    }
    else{
      res.send({status:"failed"})
    }
  })
})
app.post('/forgot-password',bodyparser.json(),(req,res)=>{
  console.log(req.body);
  var collection =connection.db('smsdb').collection('users');
  collection.find({email:req.body.email}).toArray((err,docs)=>{
    if(!err && docs.length > 0){
      res.send({Status:"Ok",resultData:docs});
      sendMail("kkgupta221997@gmail.com", "ijcnsdglzlkujfgr" ,req.body.email, "Forgot Password",
       '<h3>Hi</h3><br><p> your password is:</p>'+ JSON.stringify(docs[0].password))
    }
    else
    {
        res.send({Status:"failed",resultData:err});
    }
  })
})
app.post('/create-student',bodyparser.json(),(req,res)=>{
  console.log(req.body);
  var collection =connection.db('smsdb').collection('students');
   collection.insert(req.body,(err,r)=>{
   if(!err){
      res.send({status:"Ok"});
   }
   else{
      res.send({status:"failed"});
     }
   })
 
})
app.get('/getstudents',bodyparser.json(), (req,res)=>{
  var collection =connection.db('smsdb').collection('students');
  
  console.log(req.body);
  
  collection.find().toArray((err,docs)=>{
      if(!err && docs.length > 0){
          console.log(docs)
          res.send({status:"Ok",resultData:docs})
      }
      else{
          res.send({status:"failed",resultData:err})
      }
     
  })
})
app.post('/studentdetail',bodyparser.json(), (req,res)=>{
  var collection =connection.db('smsdb').collection('students');
  var query = {email:req.body.email}
  console.log(req.body);
  collection.find(query).toArray((err,docs)=>{
      if(!err && docs.length > 0){
          console.log(docs)
          res.send({status:"Ok",resultData:docs})
      }
      else{
          res.send({status:"failed",resultData:err})
      }
     
  })
})
app.post('/delete-student',bodyparser.json(), (req,res)=>{
  console.log(req.body);
  var collection =connection.db('smsdb').collection('students');
collection.remove({_id:ObjectId(req.body._id)},(err,r)=>{
  if(!err){
      res.send({status:"Ok"});
  }
  else{
      res.send({status:"failed"});
  }
})
})
app.put('/update-student',bodyparser.json(), (req,res)=>{
  console.log(req.body);
  var collection =connection.db('smsdb').collection('students');
collection.update({_id:ObjectId(req.body._id)},
     {$set:{name:req.body.name,fathername:req.body.fathername,email:req.body.email,
      contactno:req.body.contactno, gender:req.body.gender, branch:req.body.branch,
      course:req.body.course, teachername:req.body.teachername
      ,dateofbirth:req.body.dateofbirth,address:req.body.address,
    batchname:req.body.batchname, courseid:req.body.courseid}},(err,r)=>{
  if(!err){
      res.send({status:"Ok"});
      console.log("1 document updated");
  }
  else{
      res.send({status:"failed"});
  }
})
})

app.post('/create-teacher',bodyparser.json(),(req,res)=>{
  console.log(req.body);
  var collection =connection.db('smsdb').collection('teachers');
   collection.insert(req.body,(err,r)=>{
   if(!err){
      res.send({status:"Ok"});
   }
   else{
      res.send({status:"failed"});
     }
   })
 
})
app.get('/getteachers',bodyparser.json(), (req,res)=>{
  var collection =connection.db('smsdb').collection('teachers');
  
  console.log(req.body);
  
  collection.find().toArray((err,docs)=>{
      if(!err && docs.length > 0){
          console.log(docs)
          res.send({status:"Ok",resultData:docs})
      }
      else{
          res.send({status:"failed",resultData:err})
      }
     
  })
})
app.post('/teacherdetail',bodyparser.json(), (req,res)=>{
  var collection =connection.db('smsdb').collection('teachers');
  var query = {email:req.body.email}
  console.log(req.body);
  console.log(query);
  collection.find(query).toArray((err,docs)=>{
      if(!err && docs.length > 0){
          console.log(docs)
          res.send({status:"Ok",resultData:docs})
      }
      else{
          res.send({status:"failed",resultData:err})
      }
     
  })
})
app.post('/delete-teacher',bodyparser.json(), (req,res)=>{
  console.log(req.body);
  var collection =connection.db('smsdb').collection('teachers');
collection.remove({_id:ObjectId(req.body._id)},(err,r)=>{
  if(!err){
      res.send({status:"Ok"});
  }
  else{
      res.send({status:"failed"});
  }
})
})
app.put('/update-teacher',bodyparser.json(), (req,res)=>{
  console.log(req.body);
  var collection =connection.db('smsdb').collection('teachers');
collection.update({_id:ObjectId(req.body._id)},
     {$set:{name:req.body.name,email:req.body.email,
      contactno:req.body.contactno,gender:req.body.gender,
      course:req.body.course
      ,dateofbirth:req.body.dateofbirth,address:req.body.address}},(err,r)=>{
  if(!err){
      res.send({status:"Ok"});
      console.log("1 document updated");
  }
  else{
      res.send({status:"failed"});
  }
})
})
app.post('/addcourse',bodyparser.json(),(req,res)=>{
  console.log(req.body);
  var collection =connection.db('smsdb').collection('courses');
  collection.insert(req.body,(err,r)=>{
    if(!err){
       res.send({status:"Ok"});
    }
    else{
       res.send({status:"failed"});
      }
    })
})
app.get('/getcourse',bodyparser.json(),(req,res)=>{
  console.log(req.body)
  var collection =connection.db('smsdb').collection('courses');
  collection.find().toArray((err,docs)=>{
    if(!err && docs.length > 0){
        console.log(docs)
        res.send({status:"Ok",resultData:docs})
    }
    else{
        res.send({status:"failed",resultData:err})
    }
   
})
})

app.post('/deletecourse',bodyparser.json(), (req,res)=>{
  console.log(req.body);
  var collection =connection.db('smsdb').collection('courses');
collection.remove({_id:ObjectId(req.body._id)},(err,r)=>{
  if(!err){
      res.send({status:"Ok"});
  }
  else{
      res.send({status:"failed"});
  }
})
})


app.listen(3000,()=>{console.log("serve is listning on port 3000")});

function sendMail(from, appPassword, to, subject,  htmlmsg)
{
    let transporter=nodemailer.createTransport(
        {
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:
            {
             //  user:"weforwomen01@gmail.com",
             //  pass:""
             user:from,
              pass:appPassword
              
    
            }
        }
      );
    let mailOptions=
    {
       from:from ,
       to:to,
       subject:subject,
       html:htmlmsg
    };
    transporter.sendMail(mailOptions ,function(error,info)
    {
      if(error)
      {
        console.log(error);
      }
      else
      {
        console.log('Email sent:'+info.response);
      }
    });
}
