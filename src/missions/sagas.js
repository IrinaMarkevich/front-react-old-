import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  MISSION_CREATING,
  MISSION_REQUESTING,
} from './constants'

import {
  missionCreateSuccess,
  missionCreateError,
  missionRequestSuccess,
  missionRequestError,
} from './actions'

const missionsUrl = 'http://localhost:5000'
const axios = require('axios')

// Nice little helper to deal with the response
// converting it to json, and handling errors
// function handleRequest (request) {
//   return request
//     .then(handleApiErrors)
//     .then(response => response.json())
//     .then(json => json)
//     .catch((error) => { throw error })
// }

function missionCreateApi (client, mission) {
  const urlMission = `${missionsUrl}/mission`
  const param = mission
  param.userId = client.token.user_id
  return axios({
    method: 'post',
    url: urlMission,
    headers: {
      'Content-Type': 'application/json',
      // passes our token as an "Authorization" header in
      // every POST request.
      Authorization: client.token.user_id || undefined, // will throw an error if no login
    },
    data: param,
  })
  .then(handleApiErrors)
  .then(response => response.data)
  .then(json => json)
  .catch((error) => { throw error })
}

function* missionCreateFlow (action) {
  try {
    const { client, mission } = action
    const createdMission = yield call(missionCreateApi, client, mission)
    // creates the action with the format of
    // {
    //   type: MISSION_CREATE_SUCCESS,
    //   mission,
    // }
    // Which we could do inline here, but again, consistency
    yield put(missionCreateSuccess(createdMission))
  } catch (error) {
    // same with error
    yield put(missionCreateError(error))
  }
}

function missionRequestApi (client) {
  const urlMission = `${missionsUrl}/mission/${client.token.user_id}`
  console.log(urlMission)
  return axios({
    method: 'get',
    url: urlMission,
  })
  .then(handleApiErrors)
  .then(response => response.data)
  .then(json => json)
  .catch((error) => { throw error })
}

function* missionRequestFlow (action) {
  try {
    // grab the client from our action
    const { client } = action
    // call to our missionRequestApi function with the client
    const missions = yield call(missionRequestApi, client)
    // dispatch the action with our missions!
    yield put(missionRequestSuccess(missions))
  } catch (error) {
    yield put(missionRequestError(error))
  }
}

function* missionsWatcher () {
  // each of the below RECEIVES the action from the .. action
  yield [
    takeLatest(MISSION_CREATING, missionCreateFlow),
    takeLatest(MISSION_REQUESTING, missionRequestFlow),
  ]
}

export default missionsWatcher
