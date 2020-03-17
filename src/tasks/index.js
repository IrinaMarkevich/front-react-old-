import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import { taskCreate, taskRequest } from './actions'


class Tasks extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    tasks: PropTypes.shape({
      list: PropTypes.array,
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }).isRequired,
    taskCreate: PropTypes.func.isRequired,
    taskRequest: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }
  constructor (props) {
    super(props)

    this.fetchTasks()
  }


  fetchTasks = () => {
    const { taskRequest } = this.props
    const missionId = this.props.params.mission_id
    return taskRequest(missionId)
    // if (client && client.token) return taskRequest(client)
    // return false
  }


  submit = (task) => {
    const { taskCreate, reset } = this.props
    const missionId = this.props.params.mission_id
    taskCreate(missionId, task)

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
      tasks: {
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
            <h1>CREATE THE TASK</h1>

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
            {requesting && <span>Creating task...</span>}
            {!requesting && !!errors.length && (
              <Errors message="Failure to create Task due to:" errors={errors} />
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
              </tr>
            </thead>
            <tbody>
              {list && !!list.length && (
                list.map(task => (
                  <tr key={task.id}>
                    <td>
                      <strong>{`${task.title}`}</strong>
                    </td>
                    <td>
                      {`${task.status}`}
                    </td>
                    <td>
                      {`${task.result}`}
                    </td>
                    <td>
                      {`${task.time}`}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* <button onClick={this.fetchTasks}>Refetch Tasks!</button> */}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  client: state.client,
  tasks: state.tasks,
})


const connected = connect(mapStateToProps, { taskCreate, taskRequest })(Tasks)
const formed = reduxForm({
  form: 'tasks',
})(connected)

export default formed
