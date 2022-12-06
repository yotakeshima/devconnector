import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <Routes>
        <Route exact path="/" element={<Landing />} />
      </Routes>
      <section className="containter">
        <Switch>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
