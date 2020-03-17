import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import { missionCreate, missionRequest } from './actions'


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

    this.fetchMissions()
  }


  fetchMissions = () => {
    const { client, missionRequest } = this.props
    return missionRequest(client)
    // if (client && client.token) return missionRequest(client)
    // return false
  }


  submit = (mission) => {
    const { client, missionCreate, reset } = this.props

    missionCreate(client, mission)

    reset()
  }

  renderNameInput = ({ input, type, meta: { touched, error } }) => (
    <div>

      <input
        {...input}
        type={type}
      />

      {touched && error && (
        <div style={{ color: '#cc7a6f', margin: '-10px 0 15px', fontSize: '0.7rem' }}>
          {error}
        </div>
        )
      }
    </div>
  )

  render () {
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

            />

            <label htmlFor="name">Title</label>
            <Field
              name="title"
              type="text"
              id="title"
              className="name"
              component="input"

            />
            <label htmlFor="status">Status</label>
            <Field
              name="status"
              type="text"
              id="status"
              className="name"
              component="input"

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

        <div className="widget-list">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Result</th>
                <th>Time</th>
                <th>Tasks</th>
              </tr>
            </thead>
            <tbody>
              {list && !!list.length && (
                list.map(mission => (
                  <tr key={mission.id}>
                    <td>
                      <Link to={`/missions/${mission.id}/tasks`} >
                        <strong>{`${mission.title}`}</strong>
                      </Link>
                    </td>
                    <td>
                      {`${mission.status}`}
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

          {/* <button onClick={this.fetchMissions}>Refetch Missions!</button> */}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  client: state.client,
  missions: state.missions,
})


const connected = connect(mapStateToProps, { missionCreate, missionRequest })(Missions)
const formed = reduxForm({
  form: 'missions',
})(connected)

export default formed
