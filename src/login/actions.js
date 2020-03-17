import {
  LOGIN_REQUESTING,
} from './constants'


const loginRequest = function loginRequest ({ id, password }) {
  return {
    type: LOGIN_REQUESTING,
    id,
    password,
  }
}


export default loginRequest
