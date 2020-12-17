import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'

import Nav from './Nav'
import App from './App'
import Banner from "./Banner"
import SwapApp from './SwapApp'
import Contribute from './Contribute'
import AddRequest from './AddRequest'
import EndAndRepay from './EndAndRepay'


class Main extends React.Component {
  render() {
    return (
      <div className="app">
        <Nav />
        <br />
        <Banner />
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={App} />
            <Route path="/request/add" component={AddRequest} />
            <Route path="/request/contribute" component={Contribute} />
            <Route path="/request/end" component={EndAndRepay} />
            <Route path="/swap" component={SwapApp} />
            <Redirect to="/home" />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}


export default Main;
