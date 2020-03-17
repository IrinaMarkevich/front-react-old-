import {
  TASK_CREATING,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_ERROR,
  TASK_REQUESTING,
  TASK_REQUEST_SUCCESS,
  TASK_REQUEST_ERROR,
} from './constants'

export const taskCreate = function taskCreate (missionId, task) {
  return {
    type: TASK_CREATING,
    missionId,
    task,
  }
}

export const taskCreateSuccess = function taskCreateSuccess (task) {
  return {
    type: TASK_CREATE_SUCCESS,
    task,
  }
}

export const taskCreateError = function taskCreateError (error) {
  return {
    type: TASK_CREATE_ERROR,
    error,
  }
}

export const taskRequest = function taskRequest (missionId) {
  return {
    type: TASK_REQUESTING,
    missionId,
  }
}

export const taskRequestSuccess = function taskRequestSuccess (tasks) {
  return {
    type: TASK_REQUEST_SUCCESS,
    tasks,
  }
}

export const taskRequestError = function taskRequestError (error) {
  return {
    type: TASK_REQUEST_ERROR,
    error,
  }
}
