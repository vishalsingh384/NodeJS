import React from "react";
import ClassRoom from "./ClassRoom";
import TeacherLogin from "./TeacherLogin";
import StudentLogin from "./StudentLogin";
import AssignmentUpload from "./AssignmentUpload";
import StudentUpload from "./StudentUpload";
import AddStudent from "./AddStudent";
import StudentWorkUpload from "./studentWorkUpload";
import CheckAssignment from "./CheckAssignment";
//import Route from "./route";
import { Route, Switch } from "react-router-dom";
//import { render } from "@testing-library/react";
class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ClassRoom} />

          <Route exact path="/teacher" component={TeacherLogin} />

          <Route
            exact
            path="teacher/check-assignment"
            component={TeacherLogin}
          />

          <Route exact path="/student" component={StudentLogin} />

          <Route exact path="/student/upload" component={StudentUpload} />
          <Route
            exact
            path="/teacher/assignment"
            component={AssignmentUpload}
          />
          <Route exact path="/teacher/add" component={AddStudent} />

          <Route
            exact
            path="/teacher/check-assignment"
            component={CheckAssignment}
          />

          <Route
            exact
            path="/student/upload-work"
            component={StudentWorkUpload}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
