import SignupSaga from './signup/sagas'
import LoginSaga from './login/sagas'
import MissionSaga from './missions/sagas'

export default function* IndexSaga () {
  yield [
    SignupSaga(),
    LoginSaga(),
    MissionSaga(),
  ]
}
