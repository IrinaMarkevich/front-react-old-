import {
  MISSION_CREATING,
  MISSION_CREATE_SUCCESS,
  MISSION_CREATE_ERROR,
  MISSION_REQUESTING,
  MISSION_REQUEST_SUCCESS,
  MISSION_REQUEST_ERROR,
} from './constants'

export const missionCreate = function missionCreate (client, mission) {
  return {
    type: MISSION_CREATING,
    client,
    mission,
  }
}

export const missionCreateSuccess = function missionCreateSuccess (mission) {
  return {
    type: MISSION_CREATE_SUCCESS,
    mission,
  }
}

export const missionCreateError = function missionCreateError (error) {
  return {
    type: MISSION_CREATE_ERROR,
    error,
  }
}

export const missionRequest = function missionRequest (client) {
  return {
    type: MISSION_REQUESTING,
    client,
  }
}

export const missionRequestSuccess = function missionRequestSuccess (missions) {
  return {
    type: MISSION_REQUEST_SUCCESS,
    missions,
  }
}

export const missionRequestError = function missionRequestError (error) {
  return {
    type: MISSION_REQUEST_ERROR,
    error,
  }
}
