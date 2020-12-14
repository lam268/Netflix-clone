import React, { Component } from "react";
import './css/App.css'
import Main from './pages'
import Login from './pages/Login'
import Register from './pages/Register'
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return (
      <Switch>
        <Route exact path = "/" component = {Main} />
        <Route path = "/login" component = {Login} />
        <Route path = "/register" component = {Register} />
      </Switch>
    )
  }
}


export default App;
