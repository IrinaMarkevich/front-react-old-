import SignupSaga from './signup/sagas'
import LoginSaga from './login/sagas'
import MissionSaga from './missions/sagas'
import TaskSaga from './tasks/sagas'

export default function* IndexSaga () {
  yield [
    SignupSaga(),
    LoginSaga(),
    MissionSaga(),
    TaskSaga(),
  ]
}
