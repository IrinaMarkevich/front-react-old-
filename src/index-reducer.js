import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from './client/reducer'
import signup from './signup/reducer'
import login from './login/reducer'
import missions from './missions/reducer'

const IndexReducer = combineReducers({
  signup,
  client,
  login,
  form,
  missions,
})

export default IndexReducer
