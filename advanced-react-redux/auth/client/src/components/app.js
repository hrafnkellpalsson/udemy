import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from './header'
import Signin from './auth/signin'
import Signout from './auth/signout'
import Signup from './auth/signup'
import Feature from './feature'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" render={() => <div>Page Landing</div>} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={Signup} />
        <Route path="/feature" component={Feature} />
      </div>
    );
  }
}
