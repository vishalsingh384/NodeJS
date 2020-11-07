import React, { Component } from "react";
import "./Style.css";
//import LoginPage from "./LoginPage";
class ClassRoom extends Component {
  state = { select: "" };
  onchange = (e) => {
    if (e.target.value == "teacher") {
      this.setState({ select: "/teacher" });
    }
    if (e.target.value == "student") {
      this.setState({ select: "/student" });
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="heading">
          <h1>Join Your Class Room</h1>
        </div>
        <hr />
        <div className="row">
          <div className=" class col-12 col-sm-10">
            <h3>ReactJs Class </h3>
            <p>Select your category before starting the class</p>
            <select className="form-control" onChange={this.onchange}>
              <option value="none">select your catagory</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            <br />
            <a href={this.state.select} className="btn btn-danger">
              <span>
                Start <i className="fa fa-long-arrow-right"></i>
              </span>
            </a>
          </div>
        </div>
        <hr></hr>
      </div>
    );
  }
}

export default ClassRoom;
