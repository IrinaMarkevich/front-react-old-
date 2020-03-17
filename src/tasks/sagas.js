import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  TASK_CREATING,
  TASK_REQUESTING,
} from './constants'

import {
  taskCreateSuccess,
  taskCreateError,
  taskRequestSuccess,
  taskRequestError,
} from './actions'

const tasksUrl = 'http://localhost:5000'
const axios = require('axios')


// function handleRequest (request) {
//   return request
//     .then(handleApiErrors)
//     .then(response => response.json())
//     .then(json => json)
//     .catch((error) => { throw error })
// }

function taskCreateApi (missionId, task) {
  const urlTask = `${tasksUrl}/task`
  const param = task
  param.missionId = missionId
  console.log(param)
  return axios({
    method: 'post',
    url: urlTask,
    headers: {
      'Content-Type': 'application/json',

      // Authorization: client.id || undefined,
    },
    data: param,
  })
  .then(handleApiErrors)
  .then(response => response.data)
  .then(json => json)
  .catch((error) => { throw error })
}

function* taskCreateFlow (action) {
  try {
    const { missionId, task } = action
    const createdTask = yield call(taskCreateApi, missionId, task)

    yield put(taskCreateSuccess(createdTask))
  } catch (error) {
    yield put(taskCreateError(error))
  }
}

function taskRequestApi (missionId) {
  const urlTask = `${tasksUrl}/task/${missionId}`
  return axios({
    method: 'get',
    url: urlTask,
  })
  .then((data) => {
    console.log('data', data)
    return data
  })
  .then(response => response.data)

  .catch((error) => { throw error })
}

function* taskRequestFlow (action) {
  try {
    const { missionId } = action


    const tasks = yield call(taskRequestApi, missionId)


    yield put(taskRequestSuccess(tasks))
  } catch (error) {
    yield put(taskRequestError(error))
  }
}

function* tasksWatcher () {
  yield [
    takeLatest(TASK_CREATING, taskCreateFlow),
    takeLatest(TASK_REQUESTING, taskRequestFlow),
  ]
}

export default tasksWatcher
