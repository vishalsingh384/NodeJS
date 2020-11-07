const mongoose = require("mongoose");

// creating the schema
const studentAssigSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  regno: String,
  subject: String,
  filename:String,
});

module.exports = mongoose.model("StudentAssignment", studentAssigSchema);