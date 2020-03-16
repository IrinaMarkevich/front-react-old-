import { SIGNUP_REQUESTING } from './constants'

const signupRequest = function signupRequest ({ id, name, password, email, gender, age }) {
  // console.log('called')
  return {
    type: SIGNUP_REQUESTING,
    id,
    name,
    password,
    email,
    gender,
    age,
  }
}

export default signupRequest
