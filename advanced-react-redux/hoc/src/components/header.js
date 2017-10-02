import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../actions'

class Header extends Component {
  authButton(authenticated) {
    const authenticate = this.props.authenticate    

    if (authenticated) {
      return <button onClick={() => authenticate(false)} className="btn btn-secondary">Sign out</button>
    }

    return <button onClick={() => authenticate(true)} className="btn btn-primary">Sign in</button>
  }

  render() {
    const authenticated = this.props.authenticated

    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/resources">Resources</Link>
          </li>
          <li className="nav-item">
            {this.authButton(authenticated)}
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({ authenticated }) {
  return { authenticated }
}

export default connect(mapStateToProps, actions)(Header)
