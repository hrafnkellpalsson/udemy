import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions'

class Signup extends Component {
  handleFormSubmit = values => {
    // Call action creator to sign up the user!
    const { email, password } = values
    const redirect = () => { this.props.history.push('/feature') }
    this.props.signupUser(email, password, redirect)
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
    const meta = field.meta
    return (
      <div>
        <label>{field.label}</label>
        <input {...field.input} type={field.type} className="form-control"></input>
        {meta.error && meta.touched && <span className="alert-danger">{meta.error}</span>}
      </div>
    )
  }

  render() {
    const { handleSubmit, pristine, submitting, errorMessage } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <Field name="email" component={this.renderInput} type="email" label="Email:" className="form-control"></Field>
          <Field name="password" component={this.renderInput} type="password" label="Password:" className="form-control"></Field>
          <Field name="passwordConfirm" component={this.renderInput} type="password" label="Confirm password:" className="form-control"></Field>
        </fieldset>
        {this.renderAlert(errorMessage)}
        <button action="submit" className="btn btn-primary" disabled={pristine || submitting}>Sign up!</button>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Please enter an email'
  }

  if (!values.password) {
    errors.password = 'Please enter a password'
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation'
  }

  if (values.password != values.passwordConfirm) {
    errors.password = 'Passwords must match'
  }

  // If the 'error' object is empty when returned then validation passed
  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const form = reduxForm({ form: 'signup', validate })(Signup)
export default connect(mapStateToProps, actions)(form)
