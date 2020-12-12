import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'

import Nav from './Nav'
import App from './App'
import AddRequest from './AddRequest'


class Main extends React.Component {
  render() {
    return (
      <div className="app">
        <Nav />
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={App} />
            <Route path="/request/add" component={AddRequest} />
            <Redirect to="/home" />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}


export default Main
