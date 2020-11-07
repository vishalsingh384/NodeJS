const mongoose = require("mongoose");

// creating the schema
const assignmentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  filename: String,
  uid: String,
  subject: String,
  assignment: String,
});

module.exports = mongoose.model("Assignment", assignmentSchema);