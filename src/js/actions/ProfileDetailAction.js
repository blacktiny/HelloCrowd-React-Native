import { ActionTypes } from '../constants/constants'

export function getLocationByWhat3Words() {
  return {
    type: ActionTypes.GET_LOCATION,
    payload: {}
  }
}