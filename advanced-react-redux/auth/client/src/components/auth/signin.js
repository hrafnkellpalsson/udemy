import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions'

class Signin extends Component {
  handleFormSubmit = values => {
    const { email, password } = values
    // Need to do something to sign user in
    const redirect = () => { this.props.history.push('/feature') }
    this.props.signinUser({ email, password }, redirect)
  };

  renderAlert = errorMessage => {
    if (!errorMessage) return

    return (
      <div className="alert alert-danger">
        <strong>Oops!</strong> {errorMessage}
      </div>
    )
  }

  renderInput = field => {
    return (
      <fieldset className="form-group">
        <label>{field.label}:</label>
        <input {...field.input} type={field.type} className="form-control" />
      </fieldset>
    )
  }

  render() {
    const { handleSubmit, errorMessage } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        {/* Our auth server expects an 'email' field for signup, not a 'username' field. Naming must be consistent! */}
        <Field name="email" component={this.renderInput} label="Email" type="text" />
        <Field name="password" component={this.renderInput} label="Password" type="password" />
        {this.renderAlert(errorMessage)}
        <button className="btn btn-primary" action="submit">
          Sign in
        </button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

// export default reduxForm({ form: 'signin' }, null, actions)(Signin)
const form = reduxForm({ form: 'signin' })(Signin)
export default connect(mapStateToProps, actions)(form)
