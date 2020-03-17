import {
  MISSION_CREATING,
  MISSION_CREATE_SUCCESS,
  MISSION_CREATE_ERROR,
  MISSION_REQUESTING,
  MISSION_REQUEST_SUCCESS,
  MISSION_REQUEST_ERROR,
} from './constants'

const initialState = {
  list: [],
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function missionReducer (state = initialState, action) {
  switch (action.type) {
    case MISSION_CREATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{
          body: `Mission: ${action.mission.title} being created...`,
          time: new Date(),
        }],
        errors: [],
      }


    case MISSION_CREATE_SUCCESS:
      return {
        list: state.list.concat([action.mission]),
        requesting: false,
        successful: true,
        messages: [{
          body: `Mission: ${action.mission.title} awesomely created!`,
          time: new Date(),
        }],
        errors: [],
      }

    case MISSION_CREATE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case MISSION_REQUESTING:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: [{
          body: 'Fetching missions...!',
          time: new Date(),
        }],
        errors: [],
      }

    case MISSION_REQUEST_SUCCESS:
      return {
        list: action.missions,
        requesting: false,
        successful: true,
        messages: [{
          body: 'Missions awesomely fetched!',
          time: new Date(),
        }],
        errors: [],
      }

    case MISSION_REQUEST_ERROR:
      return {
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat[{
          body: action.error.toString(),
          time: new Date(),
        }],
      }

    default:
      return state
  }
}

export default reducer
