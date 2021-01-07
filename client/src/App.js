import React, { Component } from "react";
import './css/App.css'
import Main from './pages/index'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/admin'
import { Switch, Route } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path = "/" component = {Main} />
        <Route path = "/login" component = {Login} />
        <Route path = "/register" component = {Register} />
        <Route path = "/admin" component = {Admin} />
      </Switch>
    )
  }
}


export default App;
