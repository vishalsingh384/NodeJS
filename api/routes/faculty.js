//importing express and using route given by express
const express = require("express");
const multer = require('multer');
const Assignment = require("../model/assignment");
const router = express.Router();
const mongoose = require("mongoose");
const StudentAssignment = require("../model/studentassig");


var storage = multer.diskStorage({
  destination: function (request, file, callback) {
      callback(null, './uploads/');
  },
  filename: function (request, file, callback) {
      console.log(file);
      callback(null, Date.now()+"-"+file.originalname)
  }
});

var upload = multer({ storage: storage });

//making post http call
router.post("/upload", upload.single("file"),(req, res) => {

  const assig = new Assignment({
    _id: new mongoose.Types.ObjectId(),
    filename: req.file.filename,
    uid: req.body.uid,
    subject: req.body.subject,
    assignment: req.body.assignment,
  });

  assig.save().then((result) => {
    console.log(result);
    res.status(200).json({
      status: 200,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(200).json({
      status: 400,
    });
  });
});


router.get("/check-assignment", (req, res, next) => {
  
  StudentAssignment.find({}, (err, assignments) =>{
    
    res.json(assignments);
    
  });
  
});

//making post http call
router.post("/login", (req, res, next) => {

  if(req.body.username === "admin" && req.body.password === "admin"){
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
});

//exporting the route
module.exports = router;
