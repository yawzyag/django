import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "typeface-roboto";
import Login from "./components/session/Login";
import Register from "./components/session/Register";
import { AccessAlarm, ThreeDRotation } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import PersistentDrawerLeft from "./components/PersistentDrawerLeft";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import TestDetail from "./components/test/TestDetail";
import PersistentDrawerLeftExam from "./components/PersistentDrawerLeftExam";

function App() {
  return (
    <div className="App">
      {/* <Container maxWidth="sm">
        <img src={AccessAlarm} alt="icon" />
        <Button variant="contained" color="primary">
          Hola Mundo!
        </Button>
      </Container> */}
      {/* <PersistentDrawerLeft/> */}
      {/* <Login/> */}
      <Router>
        <div>
          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/examenes" component={PersistentDrawerLeft}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route
              path="/examen/:id"
              component={PersistentDrawerLeftExam}
            ></Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
