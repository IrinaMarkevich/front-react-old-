import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import signupRequest from './actions'

class Signup extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    signupRequest: PropTypes.func,
    signup: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
  }

  submit = (values) => {
    this.props.signupRequest(values)
  }

  render () {
    const {
      handleSubmit,
      signup: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props

    return (
      <div className="signup">

        <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Signup</h1>

          <label htmlFor="id">Id</label>
          <Field
            name="id"
            type="text"
            id="id"
            className="id"
            label="Id"
            component="input"
          />

          <label htmlFor="name">Name</label>
          <Field
            name="name"
            type="text"
            id="name"
            className="name"
            label="Name"
            component="input"
          />

          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            id="password"
            className="password"
            label="Password"
            component="input"
          />

          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="text"
            id="email"
            className="email"
            label="Email"
            component="input"
          />

          <label htmlFor="gender">Gender</label>
          <Field
            name="gender"
            type="text"
            id="gender"
            className="name"
            label="Gender"
            component="input"
          />

          <label htmlFor="age">Age</label>
          <Field
            name="age"
            type="number"
            id="age"
            className="number"
            label="Age"
            component="input"
          />

          <button action="submit">SIGNUP</button>
        </form>
        <div className="auth-messages">

          {!requesting && !!errors.length && (
            <Errors message="Failure to signup due to:" errors={errors} />
          )}
          {!requesting && !!messages.length && (
            <Messages messages={messages} />
          )}
          {!requesting && successful && (
            <div>
              Signup Successful! <Link to="/login">Click here to Login »</Link>
            </div>
          )}

          {!requesting && !successful && (
            <Link to="/login">Already a Widgeter? Login Here »</Link>
          )}
        </div>
      </div>
    )
  }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  signup: state.signup,
})

// Connect our component to redux and attach the `signup` piece
// of state to our `props` in the component.  Also attach the
// `signupRequest` action to our `props` as well.
const connected = connect(mapStateToProps, { signupRequest })(Signup)

// Connect our connected component to Redux Form.  It will namespace
// the form we use in this component as `signup`.
const formed = reduxForm({
  form: 'signup',
})(connected)

// Export our well formed component!
export default formed
