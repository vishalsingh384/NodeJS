//including mongoose to connect with mongodb
const mongoose = require("mongoose");

// creating the schema
const studentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  regno: String,
  email: String,
  password: String,
  // phone_numbe:Number
});

module.exports = mongoose.model("Student", studentSchema);
