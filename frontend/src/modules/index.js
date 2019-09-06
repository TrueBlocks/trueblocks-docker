import { combineReducers } from 'redux'
import systemStatus from './systemStatus'
import monitorStatus from './monitorStatus'
import indexData from './indexData'
import settingsManager from './settingsManager'
import monitorAdd from './monitorRemove'
import monitorRemove from './monitorRemove'

export default combineReducers({
  systemStatus,
  monitorStatus,
  indexData,
  settingsManager,
  monitorAdd,
  monitorRemove
})
