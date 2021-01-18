import React, { Component } from "react";
import './components/css/App.css'
import Main from './pages/index'
import Login from './pages/Login'
import Register from './pages/Register'
import Vod from './components/playvid/Vod'
import Chatroom from './components/playvid/Chatroom'
import { Switch, Route } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path = "/" component = {Main} />
        <Route path = "/login" component = {Login} />
        <Route path = "/register" component = {Register} />
        <Route exact path={'/watch/:title'} component={Vod} />
        <Route exact path={'/watch/room/:room'} component={Chatroom} />
      </Switch>
    )
  }
}


export default App;
