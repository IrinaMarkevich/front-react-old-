import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'


import { browserHistory } from 'react-router'


import { handleApiErrors } from '../lib/api-errors'


import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants'


import {
  setClient,
  unsetClient,
} from '../client/actions'

import {
  CLIENT_UNSET,
} from '../client/constants'

const axios = require('axios')

const loginUrl = 'http://localhost:5000/auth/login'

function loginApi (id, password) {
  return axios({
    method: 'post',
    url: loginUrl,
    data: { id, password },
  })
    .then(handleApiErrors)
    .then((response) => {
      console.log(response)
      return response
    })
    .then(response => response.data)
    .then((response) => {
      console.log(response)
      return response
    })
    .then(json => json)
    .catch((error) => { throw error })
}

function* logout () {
  yield put(unsetClient())


  localStorage.removeItem('token')


  browserHistory.push('/login')
}

function* loginFlow (id, password) {
  let token
  try {
    token = yield call(loginApi, id, password)


    yield put(setClient(token))


    yield put({ type: LOGIN_SUCCESS })


    localStorage.setItem('token', token)


    browserHistory.push('/missions')
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error })
  } finally {
    if (yield cancelled()) {
      browserHistory.push('/login')
    }
  }


  return token
}


function* loginWatcher () {
  while (true) {
    const { id, password } = yield take(LOGIN_REQUESTING)


    const task = yield fork(loginFlow, id, password)


    const action = yield take([CLIENT_UNSET, LOGIN_ERROR])


    if (action.type === CLIENT_UNSET) yield cancel(task)


    yield call(logout)
  }
}

export default loginWatcher
