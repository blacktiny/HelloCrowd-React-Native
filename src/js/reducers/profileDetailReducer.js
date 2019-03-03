import { ActionTypes } from '../constants/constants'

const initialState = {
  location: []
};

export const profileDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_LOCATION:
      return {
        ...state
      }
    case ActionTypes.GET_LOCATION_SUCCESS:
      return {
        ...state,
        location: action.payload.geometry
      }
    case ActionTypes.GET_LOCATION_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}