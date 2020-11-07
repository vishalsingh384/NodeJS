import React, { useState } from "react";
import axios from "axios";

const StudentUpload = () => {
  const [assignment, setassignment] = useState("No assignment available");
  axios.get("http://localhost:2000/student/assignment").then((res) => {

  var x = <div>
  {res.data.map(element => (
    <div>
    <p><b>UID: </b>{element.uid}</p>
    <p><b>Subject: </b>{element.subject}</p>
    <p><b>Assignment: </b>{element.assignment}</p>
  <a href={"http://localhost:2000/uploads/"+element.filename}>Download File</a><hr/>

    </div>
  ))}</div>;

    setassignment(x);
  });
  return (
    <div>
      <div style={{ textAlign: "center", color: "black" }}>{assignment}</div>
    </div>
  );
};
export default StudentUpload;
