import {
  LOGIN_REQUESTING,
} from './constants'

// In order to perform an action of type LOGIN_REQUESTING
// we need an email and password
const loginRequest = function loginRequest ({ id, password }) {
  return {
    type: LOGIN_REQUESTING,
    id,
    password,
  }
}

// Since it's the only one here
export default loginRequest
