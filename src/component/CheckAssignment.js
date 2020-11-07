import React, { useState } from "react";
import axios from "axios";

const CheckAssignment = () => {
  const [assignment, setassignment] = useState("No assignment uploaded");
  axios.get("http://localhost:2000/faculty/check-assignment").then((res) => {

  var x = <div>
  {res.data.map(element => (
    <div>
    <p><b>Reg no: </b>{element.regno}</p>
    <p><b>Subject: </b>{element.subject}</p>
  <a href={"http://localhost:2000/uploads/students/"+element.filename}>Download File</a><hr/>

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
export default CheckAssignment;