import {
  TASK_CREATING,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_ERROR,
  TASK_REQUESTING,
  TASK_REQUEST_SUCCESS,
  TASK_REQUEST_ERROR,
} from './constants'

const initialState = {
  list: [],
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function taskReducer (state = initialState, action) {
  switch (action.type) {
    case TASK_CREATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{
          body: `Task: ${action.task.title} being created...`,
          time: new Date(),
        }],
        errors: [],
      }


    case TASK_CREATE_SUCCESS:
      return {
        list: state.list.concat([action.task]),
        requesting: false,
        successful: true,
        messages: [{
          body: `Task: ${action.task.title} awesomely created!`,
          time: new Date(),
        }],
        errors: [],
      }

    case TASK_CREATE_ERROR:
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

    case TASK_REQUESTING:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: [{
          body: 'Fetching tasks...!',
          time: new Date(),
        }],
        errors: [],
      }

    case TASK_REQUEST_SUCCESS:
      return {
        list: action.tasks,
        requesting: false,
        successful: true,
        messages: [{
          body: 'Tasks awesomely fetched!',
          time: new Date(),
        }],
        errors: [],
      }

    case TASK_REQUEST_ERROR:
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
