import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from './client/reducer'
import signup from './signup/reducer'
import login from './login/reducer'
import missions from './missions/reducer'
import tasks from './tasks/reducer'

const IndexReducer = combineReducers({
  signup,
  client,
  login,
  form,
  missions,
  tasks,
})

export default IndexReducer
