import React, { Component } from "react";
import './css/App.css'
import Main from './pages/index'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/admin'
import Vod from './video/vod'
import Watch from './video/player'
import { Switch, Route } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin" component={Admin} />
        <Route exact path={'/watch/:title'} component={Watch} />
        <Route exact path={'/vod'} component={Vod} />
      </Switch>
    )
  }
}


export default App;
