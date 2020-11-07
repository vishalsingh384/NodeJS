import React from "react";
import axios from "axios";
class AssignmentUpload extends React.Component {
  state = { regno: "",subject:"",selectedFile:null,Result: "", Style: "",};


  onsubmit = (event) => {
    if(this.state.regno === "" || this.state.subject =="" ){
      this.setState({ Result: "please fill your details", Style: "invalid" });
      return;
    }
    if(this.state.selectedFile == null){
      this.setState({ Result: "please select file to upload", Style: "invalid" });
      return;
    }

    const formData = new FormData(); 
    formData.append("file",this.state.selectedFile,this.state.selectedFile.name);
    formData.append("regno",this.state.regno);
    formData.append("subject",this.state.subject);
    axios.post('http://localhost:2000/student/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      if(res.data.status ===400)
      alert(res.data.mes);
      else{

      alert("Assignment uploaded successfully");
        window.location = window.location;
    }
      
    });

  };

  render() {
    return (
      <div>
        <form style={{ marginTop: "130px" }}>
          <h3 style={{ marginButtom: "20px" }}>Assignment Upload </h3>
          <br/>
          <label>Reg.No:</label>
          <input type="text" onChange={(e) => this.setState({ regno: e.target.value })}></input>
          <br />
          <br />
          <label>Subject</label>
          <input type="text" onChange={(e) => this.setState({ subject: e.target.value })}></input>
          <br />
          <br />
          <label>Upload here</label>
          <input style={{ borderBottom: "none" }} onChange={(e) => this.setState({ selectedFile: e.target.files[0] })} type="file"></input>
          <br />
          <br />
          <a className="btn btn-danger" onClick={this.onsubmit}>upload</a>
          
        </form>
        <div className={this.state.Style}>{this.state.Result}</div>
      </div>
    );
  }
}
export default AssignmentUpload;
