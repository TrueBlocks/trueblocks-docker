import { combineReducers } from 'redux'
import systemStatus from './systemStatus'
import chainStatus from './chainStatus'
import monitorStatus from './monitorStatus'
import settingsManager from './settingsManager'

export default combineReducers({
  systemStatus,
  chainStatus,
  monitorStatus,
  settingsManager
})
