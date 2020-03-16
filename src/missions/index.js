import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

// include our missionRequest action
import { missionCreate, missionRequest } from './actions'

// Our validation function for `name` field.
// const nameRequired = value => (value ? undefined : 'Name Required')

class Missions extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    client: PropTypes.shape({
      id: PropTypes.string.isRequired,
      token: PropTypes.object.isRequired,
    }),
    missions: PropTypes.shape({
      list: PropTypes.array,
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }).isRequired,
    missionCreate: PropTypes.func.isRequired,
    missionRequest: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }
  constructor (props) {
    super(props)
    // call the fetch when the component starts up
    this.fetchMissions()
  }

  // the helper function for requesting missions
  // with our client as the parameter
  fetchMissions = () => {
    const { client, missionRequest } = this.props
    return missionRequest(client)
    // if (client && client.token) return missionRequest(client)
    // return false
  }


  submit = (mission) => {
    const { client, missionCreate, reset } = this.props
    // call to our missionCreate action.
    missionCreate(client, mission)
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
      missions: {
        list,
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props

    console.log(list)

    return (
      <div className="widget">
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
            {requesting && <span>Creating mission...</span>}
            {!requesting && !!errors.length && (
              <Errors message="Failure to create Mission due to:" errors={errors} />
            )}
            {!requesting && successful && !!messages.length && (
              <Messages messages={messages} />
            )}
          </div>
        </div>
        {/* The Mission List Area */}

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
              {this.state.missions && !!this.state.missions.length && (
                this.state.missions.map(mission => (
                  <tr key={mission.id}>
                    <td>
                      <strong>{`${mission.title}`}</strong>
                    </td>
                    <td>
                      {`${mission.result}`}
                    </td>
                    <td>
                      {`${mission.time}`}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* A convenience button to refetch on demand */}
          <button onClick={this.fetchMissions}>Refetch Missions!</button>
        </div>
      </div>
    )
  }
}

// Pull in both the Client and the Missions state
const mapStateToProps = state => ({
  client: state.client,
  missions: state.missions,
})

// Make the Client and Missions available in the props as well
// as the missionCreate() function
const connected = connect(mapStateToProps, { missionCreate, missionRequest })(Missions)
const formed = reduxForm({
  form: 'missions',
})(connected)

export default formed
