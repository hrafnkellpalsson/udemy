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
      console.log(this.props)
      console.log(this.props.authenticated)
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps({ authenticated }) {
    return { authenticated }
  }

  return connect(mapStateToProps)(Authentication)
}
