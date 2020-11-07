import React from "react";
import "./FormStyle.css";
import axios from "axios";

class StudentLogin extends React.Component {
  /*states of class component*/
  state = { Regno: "", Password: "", Result: "", Style: "", select:"Default"};

  /* function call after submitting the form also contain the validation*/
  onFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.Regno === "" && this.state.Password === "") {
      this.setState({ Result: "please fill your details", Style: "invalid" });
    }
  };

  onchange=(event)=>{
    if(event.target.value==="upload-assignment")
    {
      this.setState({select:"student/upload-work"})
    }
    if(event.target.value==="see-assignment")
    {
      this.setState({select:"student/upload"})
    }
  }

  onClick = (event) => {
    if (this.state.Regno === "" && this.state.Password === "") {
      this.setState({ Result: "please fill your details", Style: "invalid" });
    }
    const newData = {
      regno: this.state.Regno,
      password: this.state.Password,
    };
    axios.post("http://localhost:2000/student/login", newData).then((res) => {
      console.log(res.data);
      if (res.data.status == 200) window.location.href = this.state.select; //"student/upload";
      else
        this.setState({
          Result: res.data.mes,
          Style: "invalid",
        });
    });
  };
  /*Render function to render the content*/
  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div className="col-sm-6 login-left">
            <h2> Student Login</h2>
          </div>
          <div className="col-sm-6">
            <form onSubmit={this.onFormSubmit} className="login-form">
              <h2>Login</h2>
              <input
                type="text"
                placeholder="enter reg no"
                className="username"
                onChange={(event) => {
                  this.setState({ Regno: event.target.value });
                }}
              ></input>
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
                <option value="see-assignment">See your Assignment</option>
                <option value="upload-assignment">Upload Assignment</option>
              </select>
              <br />
              <br />
              <input
                type="button"
                class="btn btn-primary"
                value="Login"
                onClick={this.onClick}
              />
              <div className={this.state.Style}>{this.state.Result}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default StudentLogin;
