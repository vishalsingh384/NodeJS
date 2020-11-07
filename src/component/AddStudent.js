import React, { Component } from "react";
import axios from "axios";
import "./Style.css";
class AddStudent extends Component {
  state = {
    name: "",
    Regno: "",
    email: "",
    password: "",
  };
  onsubmit = (e) => {
    if(!this.ValidateEmail(this.state.email))
    return;
    const newData = {
      name: this.state.name,
      regno: this.state.Regno,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("http://localhost:2000/student", newData)
      .then((res) => {
        console.log(res.data)
        if(res.data.status === 400){
          alert(res.data.mes);
        }else{
          this.setState({
            name: "",
            Regno: "",
            email: "",
            password: "",
          });
          alert("data submitted successfully!!");
        }
      
      });
  };
  ValidateEmail(mail) 
  {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
      alert("You have entered an invalid email address!")
      return (false)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onsubmit} style={{ marginTop: "95px" }}>
          <h3 style={{ marginbuttom: "30px" }}>Add The Details</h3>
          <br />
          <br />
          <label>Full Name</label>
          <input
            type="text"
            value={this.state.name}
            style={{ marginLeft: "20px" }}
            onChange={(e) => this.setState({ name: e.target.value })}
          ></input>
          <br />
          <br />
          <label>Enter Reg no</label>
          <input
            type="text"
            value={this.state.Regno}
            onChange={(e) => this.setState({ Regno: e.target.value })}
          ></input>
          <br />
          <br />
          <label>Enter Email</label>
          <input
            type="email"
            value={this.state.email}
            style={{ marginLeft: "20px" }}
            onChange={(e) => this.setState({ email: e.target.value })}
          ></input>
          <br />
          <br />
          <label style={{ marginRight: "50px" }}>Default Password</label>
          <input
            value={this.state.password}
            style={{ marginRight: "50px" }}
            type="password"
            onChange={(e) => this.setState({ password: e.target.value })}
          ></input>
          <br />
          <br />
          <a className="btn btn-danger" onClick={this.onsubmit}>
            ADD
          </a>
        </form>
      </div>
    );
  }
}

export default AddStudent;
