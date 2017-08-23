import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // By passing the routing as a callback function to our action creator we
    // can choose to route to the new view only after the ajax calls completes.
    this.props.createPost(values, () => {
      this.props.history.push('/'); // If our component is wrapped in Route react-router adds helper stuff to our props.
    });
  }

  render() {
    // Redux-form adds this property through the reduxForm method call at the
    // bottom (in much the same way as the redux connect call also adds props).
    const { handleSubmit } = this.props;

    return (
      // handleSubmit runs the redux-form side of things, like validation,
      // If validation succeeds, it also runs our custom logic by way of us
      // passing our logic as a function. Passing our function like this
      // means that it will be run in some other context (it's being invoked
      // by redux-form at some point after validation passes), so we need to
      // bind to have access to the correct 'this'.
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title"
  }
  if (!values.categories) {
    errors.categories = "Enter some categories"
  }
  if (!values.content) {
    errors.content = "Enter some content please"
  }

  // If errors is an empty object, the form is fine to submit.
  // If errors has *any* properties, redux-form assumes form in invalid.
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm',
})(
  connect(null, { createPost })(PostsNew)
);
