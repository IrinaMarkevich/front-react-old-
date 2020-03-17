import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from './constants'


const signupUrl = 'http://localhost:5000/auth/register'

function signupApi (id, name, password, email, gender, age) {
  return fetch(signupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name, password, email, gender, age }),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}


function* signupFlow (action) {
  try {
    const { id, name, password, email, gender, age } = action


    const response = yield call(signupApi, id, name, password, email, gender, age)


    yield put({ type: SIGNUP_SUCCESS, response })
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, error })
  }
}

function* signupWatcher () {
  yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}

export default signupWatcher
