import { combineReducers } from 'redux'
import systemStatus from './systemStatus'
import monitorStatus from './monitorStatus'
import indexData from './indexData'
import getSettings from './getSettings'
import monitorAdd from './monitorAdd'
import monitorRemove from './monitorRemove'

export default combineReducers({
  systemStatus,
  monitorStatus,
  indexData,
  getSettings,
  monitorAdd,
  monitorRemove
})
