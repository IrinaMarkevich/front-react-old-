import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

// include our widgetRequest action
import { widgetCreate, widgetRequest } from './actions'

// Our validation function for `name` field.
// const nameRequired = value => (value ? undefined : 'Name Required')

class Widgets extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    client: PropTypes.shape({
      id: PropTypes.string.isRequired,
      token: PropTypes.object.isRequired,
    }),
    widgets: PropTypes.shape({
      list: PropTypes.array,
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }).isRequired,
    widgetCreate: PropTypes.func.isRequired,
    widgetRequest: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }
  constructor (props) {
    super(props)
    // call the fetch when the component starts up
    this.fetchWidgets()
  }

  // the helper function for requesting widgets
  // with our client as the parameter
  fetchWidgets = () => {
    const { client, widgetRequest } = this.props
    return widgetRequest(client)
    // if (client && client.token) return widgetRequest(client)
    // return false
  }


  submit = (widget) => {
    const { client, widgetCreate, reset } = this.props
    // call to our widgetCreate action.
    widgetCreate(client, widget)
    // reset the form upon submit.
    reset()
  }

  renderNameInput = ({ input, type, meta: { touched, error } }) => (
    <div>
      {/* Spread RF's input properties onto our input */}
      <input
        {...input}
        type={type}
      />
      {/*
        If the form has been touched AND is in error, show `error`.
        `error` is the message returned from our validate function above
        which in this case is `Name Required`.

        `touched` is a live updating property that RF passes in.  It tracks
        whether or not a field has been "touched" by a user.  This means
        focused at least once.
      */}
      {touched && error && (
        <div style={{ color: '#cc7a6f', margin: '-10px 0 15px', fontSize: '0.7rem' }}>
          {error}
        </div>
        )
      }
    </div>
  )

  render () {
    // pull in all needed props for the view
    // `invalid` is a value that Redux Form injects
    // that states whether or not our form is valid/invalid.
    // This is only relevant if we are using the concept of
    // `validators` in our form.
    const {
      handleSubmit,
      invalid,
      widgets: {
        list,
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props

    return (
      <div className="widgets">
        <div className="widget-form">
          <form onSubmit={handleSubmit(this.submit)}>
            <h1>CREATE THE MISSION</h1>

            <label htmlFor="id">Id</label>
            <Field
              name="id"
              type="number"
              id="id"
              className="number"
              component="input"
              // validate={nameRequired}
            />

            <label htmlFor="name">Title</label>
            <Field
              name="title"
              type="text"
              id="title"
              className="name"
              component="input"
              // validate={nameRequired}
            />
            <label htmlFor="status">Status</label>
            <Field
              name="status"
              type="text"
              id="status"
              className="name"
              component="input"
              // validate={nameRequired}
            />

            <label htmlFor="result">Result</label>
            <Field
              name="result"
              type="number"
              id="result"
              className="description"
              component="input"
            />

            <label htmlFor="time">Time</label>
            <Field
              name="time"
              type="number"
              id="time"
              className="number"
              component="input"
            />

            {/* the button will remain disabled until not invalid */}
            <button
              disabled={invalid}
              action="submit"
            >CREATE</button>
          </form>
          <hr />
          <div className="widget-messages">
            {requesting && <span>Creating widget...</span>}
            {!requesting && !!errors.length && (
              <Errors message="Failure to create Widget due to:" errors={errors} />
            )}
            {!requesting && successful && !!messages.length && (
              <Messages messages={messages} />
            )}
          </div>
        </div>
        {/* The Widget List Area */}
        <div className="widget-list">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Result</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {list && !!list.length && (
                list.map(widget => (
                  <tr key={widget.id}>
                    <td>
                      <strong>{`${widget.title}`}</strong>
                    </td>
                    <td>
                      {`${widget.result}`}
                    </td>
                    <td>
                      {`${widget.time}`}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* A convenience button to refetch on demand */}
          <button onClick={this.fetchWidgets}>Refetch Widgets!</button>
        </div>
      </div>
    )
  }
}

// Pull in both the Client and the Widgets state
const mapStateToProps = state => ({
  client: state.client,
  widgets: state.widgets,
})

// Make the Client and Widgets available in the props as well
// as the widgetCreate() function
const connected = connect(mapStateToProps, { widgetCreate, widgetRequest })(Widgets)
const formed = reduxForm({
  form: 'widgets',
})(connected)

export default formed
