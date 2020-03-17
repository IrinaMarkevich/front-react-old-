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


function missionCreateApi (client, mission) {
  const urlMission = `${missionsUrl}/mission`
  const param = mission
  param.userId = client.token.user_id
  return axios({
    method: 'post',
    url: urlMission,
    headers: {
      'Content-Type': 'application/json',

      Authorization: client.token.user_id || undefined,
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

    yield put(missionCreateSuccess(createdMission))
  } catch (error) {
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
    const { client } = action

    const missions = yield call(missionRequestApi, client)

    yield put(missionRequestSuccess(missions))
  } catch (error) {
    yield put(missionRequestError(error))
  }
}

function* missionsWatcher () {
  yield [
    takeLatest(MISSION_CREATING, missionCreateFlow),
    takeLatest(MISSION_REQUESTING, missionRequestFlow),
  ]
}

export default missionsWatcher
