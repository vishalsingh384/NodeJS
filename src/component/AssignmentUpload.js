import React from "react";
import axios from "axios";
class AssignmentUpload extends React.Component {
  state = { uid: "",subject:"",selectedFile:null,assignment:""};


  onsubmit = () => {
    const formData = new FormData(); 
    formData.append("file",this.state.selectedFile,this.state.selectedFile.name);
    formData.append("uid",this.state.uid);
    formData.append("assignment",this.state.assignment);
    formData.append("subject",this.state.subject);
    axios.post('http://localhost:2000/faculty/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      if(res.data.status ===400)
      alert("Error uploading assignment");
      else{

      alert("Assignment uploaded successfully");
        window.location = window.location;
    }
      
    });
    //axios.post("", newData).then((res) => console.log(res.data));
  };

  render() {
    return (
      <div>
        <form style={{ marginTop: "130px" }}>
          <h3 style={{ marginButtom: "20px" }}>Assignment Upload </h3>
          <label>UID:</label>
          <input type="text" onChange={(e) => this.setState({ uid: e.target.value })}></input>
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
          <label>Type assignment</label>
          <textarea
            rows="3"
            cols="39"
            onChange={(e) => this.setState({ assignment: e.target.value })}
          ></textarea>
          <br />
          <br />
          <a className="btn btn-danger" onClick={this.onsubmit}>
            upload
          </a>
        </form>
      </div>
    );
  }
}
export default AssignmentUpload;
