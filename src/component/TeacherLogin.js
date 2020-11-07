import React from "react";
import "./FormStyle.css";
import axios from "axios";

class TeacherLogin extends React.Component {
  /*states of class component*/
  state = { Username: "", Password: "", Result: "", Style: "", select: "Default" };

  /* function call after submitting the form also contain the validation*/
  onFormSubmit = (event) => {
    event.preventDefault();
    
    if (this.state.Username === "" && this.state.Password === "") {
      this.setState({ Result: "please fill your details", Style: "invalid" });
    }
  };

  onSubmit = (event)=>{
    if (this.state.Username === "" && this.state.Password === "") {
      this.setState({ Result: "please fill your details", Style: "invalid" });
      return;
    }
    if(this.state.select=="Default"){
      this.setState({ Result: "Please selecet one option", Style: "invalid" });
      return;
    }
    const newData = {
      username:this.state.Username,
      password:this.state.Password
    }
    axios
      .post("http://localhost:2000/faculty/login", newData)
      .then((res)=>{
        console.log(res.data)
        if(res.data.status == 200)
        window.location.href = this.state.select;
        else
        this.setState({
          Result: res.data.mes,
          Style: "invalid"
        });
        
      });
  };
  onchange = (event) => {
    if (event.target.value === "assignment") {
      this.setState({ select: "teacher/assignment" });
    }
    if (event.target.value === "add") {
      this.setState({ select: "teacher/add" });
    }
    if (event.target.value === "check") {
      this.setState({ select: "teacher/check-assignment" });
    }
  };

  /*Render function to render the content*/
  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div className="col-sm-6 login-left">
            <h2> Teacher Login</h2>
          </div>
          <div className="col-sm-6">
            <form onSubmit={this.onFormSubmit} className="login-form">
              <h2>Login</h2>

              {/* username*/}

              <input
                type="text"
                placeholder="enter uid"
                className="Username"
                onChange={(event) => {
                  this.setState({ Username: event.target.value });
                }}
              />
              <br />
              <br />

              {/* password*/}

              <input
                type="password"
                placeholder="enter password"
                className="password"
                onChange={(event) => {
                  this.setState({ Password: event.target.value });
                }}
              />
              <br />
              <br />
              <select class="form-control" onChange={this.onchange}>
                <option>Select</option>
                <option value="assignment">Assignment Upload</option>
                <option value="add"> add Student</option>
                <option value="check"> check assignment</option>
              </select>
              <br />
              <br />
              {/* login button*/}
              <input value="Login" type="button" class="btn btn-primary" onClick={this.onSubmit}/>
                
              
              {/* result Displaying*/}
              <div className={this.state.Style}>{this.state.Result}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default TeacherLogin;
