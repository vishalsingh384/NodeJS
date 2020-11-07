//importing the required module
const express = require("express");
const app = express();
var cors = require("cors");

app.use(cors());

const mongoose = require("mongoose");
const studentRoute = require("./api/routes/student");
const facultyRoute = require("./api/routes/faculty");
const bodyParser = require("body-parser");


//connecting with mongodb using mongoose
mongoose.connect(
  "mongodb+srv://Akash:Admin123@cluster0.f96zl.mongodb.net/Online-ClassRoom?retryWrites=true&w=majority"
);

//checking wheather the database is connected to the node
mongoose.connection.on("error", (err) => {
  console.log("connection failed");
});
mongoose.connection.on("connected", (err) => {
  console.log("connected with database");
});
//use bodyParser before the route, it is use to take data from frontend
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//middleware
//routes for student and faculty
app.use("/student", studentRoute);
app.use("/faculty", facultyRoute);
app.use("/uploads",express.static('./uploads'));
//verification of bad url
app.use((req, res, next) => {
  res.status(404).json({
    error: "bad url",
  });
});
//exporting the module app
module.exports = app;
