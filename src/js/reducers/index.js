import { combineReducers } from 'redux'
import { loginReducer } from './loginReducer'
import { profileDetailReducer } from './profileDetailReducer'

export default combineReducers({
  loginReducer,
  profileDetailReducer
})