const express = require("express");
const multer = require('multer');

const router = express.Router();

const mongoose = require("mongoose");
//Schema included
const Student = require("../model/student");
const Assignment = require("../model/assignment");
const StudentAssignment = require("../model/studentassig");

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
      callback(null, './uploads/students/');
  },
  filename: function (request, file, callback) {
      console.log(file);
      callback(null, Date.now()+"-"+file.originalname)
  }
});

var upload = multer({ storage: storage });

router.get("/", (req, res, next) => {
  Student.find()
    .then((result) => {
      res.status(200).json({
        studentData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/login", (req, res, next) => {
  Student.find({regno:req.body.regno,password:req.body.password},(err,assignment)=>{
    if(err){
      console.log(err);
    }else{
      if(assignment.length>0){
        res.status(200).json({
          status:200,
          mes: "Login success",
        });
      }else{
        res.status(200).json({
          status:400,
          mes: "Invalid credentials",
        });
      }
    }
  });

});

router.post("/upload",upload.single("file"),(req,res)=>{

  Student.find({regno:req.body.regno},(err,data)=>{
    if(err){
      console.log(err);
    }else{
      if(data.length==0){
        res.status(200).json({
          status:400,
          mes: "Invalid regno",
        });
      }else{

        Assignment.find({subject:req.body.subject},(err,data)=>{
          if(err){
            console.log(err);
          }else{
            if(data.length==0){
              res.status(200).json({
                status:400,
                mes: "Invalid subject",
              });
            }else{
              

              StudentAssignment.find({regno:req.body.regno,subject:req.body.subject},(err,data)=>{
                if(err){
                  console.log(err);
                }else{
                  
                  if(data.length>0){
                    res.status(200).json({
                      status:400,
                      mes: "Assignment already uploaded for this subject by this student",
                    });
                  }else{


                    const assig = new StudentAssignment({
                      _id: new mongoose.Types.ObjectId(),
                      subject: req.body.subject,
                      regno: req.body.regno,
                      filename:req.file.filename
                    });

                    assig.save().then((result)=>{
                      res.status(200).json({
                        status:200,
                        mes: "Assignment Uploaded",
                      }).catch((err) => {
                        console.log(err);
                        res.status(500).json({
                          error: err,
                        });
                      });
                    });

                    
                  }
                }
              }); 

            }
          }
        }); 

      }
    }
  }); 

  
});

router.get("/assignment", (req, res, next) => {
  
  Assignment.find({}, (err, assignments) =>{
    
    res.json(assignments);
    
  });
  
});



router.post("/", (req, res, next) => {
  Student.find({regno:req.body.regno},(err,docs)=>{
    if(err){
      console.log(err);
    }else{
      if(docs.length>0){
      res.status(200).json({
        status:400,
        mes:"Reg no already exist"
      });

    }else{

      Student.find({email:req.body.email},(err,docs)=>{
        if(err){
          console.log(err);
        }else{
          if(docs.length>0){
          res.status(200).json({
            status:400,
            mes:"email already exist"
          });
        }else{

          const student = new Student({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            regno: req.body.regno,
            email: req.body.email,
            password: req.body.password,
          });

          student
            .save()
            .then((result) => {
              console.log(result);
              res.status(200).json({
                newStudent: result,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
          
        }
        }
        
      });
    }
    }
    
  });
  
  

  

});

module.exports = router;
