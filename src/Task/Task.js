import React, { Component } from 'react'
// import {Link} from 'react-router-dom';
import axios from 'axios'

class Task extends Component {
  constructor (props) {
    super(props)

    this.state = {
      task: null,
    }
  }

  async componentDidMount () {
    const { match: { params } } = this.props
    const task = (await axios.get(`http://localhost:5000/task/${params.taskId}`)).data[0]

    this.setState({
      task,
    })
  }

  render () {
    const { task } = this.state
    console.log(task)
    if (task === null) return <p>Loading ...</p>
    return (

      <div className="container">
        {/* <Link to={`/user/${user.id}/auth`}>
           <div className="card text-white bg-success mb-3">
             <div className="card-header">Auth</div>
           </div>
         </Link> */}

        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{task.title}</h1>
            <p className="lead">Status: {task.status}</p>
            <p className="lead">Result: {task.result}</p>
            <p className="lead">Time: {task.time}</p>
            <hr className="my-4" />
          </div>
        </div>
      </div>
    )
  }
}

export default Task
