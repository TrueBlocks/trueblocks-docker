import { combineReducers } from 'redux'
import systemStatus from './systemStatus'
import chainStatus from './chainStatus'
import settingsManager from './settingsManager'

export default combineReducers({
  systemStatus,
  chainStatus,
  settingsManager
})
