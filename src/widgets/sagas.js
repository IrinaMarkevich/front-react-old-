import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  WIDGET_CREATING,
  WIDGET_REQUESTING,
} from './constants'

import {
  widgetCreateSuccess,
  widgetCreateError,
  widgetRequestSuccess,
  widgetRequestError,
} from './actions'

const widgetsUrl = 'http://localhost:5000'
const axios = require('axios')

// Nice little helper to deal with the response
// converting it to json, and handling errors
function handleRequest (request) {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function widgetCreateApi (client, widget) {
  const urlMission = `${widgetsUrl}/mission`
  const param = widget
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

function* widgetCreateFlow (action) {
  try {
    const { client, widget } = action
    const createdWidget = yield call(widgetCreateApi, client, widget)
    // creates the action with the format of
    // {
    //   type: WIDGET_CREATE_SUCCESS,
    //   widget,
    // }
    // Which we could do inline here, but again, consistency
    yield put(widgetCreateSuccess(createdWidget))
  } catch (error) {
    // same with error
    yield put(widgetCreateError(error))
  }
}

function widgetRequestApi (client) {
  const url = `${widgetsUrl}/mission/${client.user_id}`
  const request = fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // passe our token as an "Authorization" header
      Authorization: client.token.user_id || undefined,
    },
  })

  return handleRequest(request)
}

function* widgetRequestFlow (action) {
  try {
    // grab the client from our action
    const { client } = action
    // call to our widgetRequestApi function with the client
    const widgets = yield call(widgetRequestApi, client)
    // dispatch the action with our widgets!
    yield put(widgetRequestSuccess(widgets))
  } catch (error) {
    yield put(widgetRequestError(error))
  }
}

function* widgetsWatcher () {
  // each of the below RECEIVES the action from the .. action
  yield [
    takeLatest(WIDGET_CREATING, widgetCreateFlow),
    takeLatest(WIDGET_REQUESTING, widgetRequestFlow),
  ]
}

export default widgetsWatcher
