import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      const { authenticated, history } = this.props

      if (!authenticated) {
        history.push('/')
      }
    }

    componentWillUpdate(nextProps) {
      const authenticated = nextProps.authenticated
      const history = this.props.history

      if (!authenticated) {
        history.push('/')
      }
    }

    render() {            
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated }
  }

  return connect(mapStateToProps)(Authentication)
}
