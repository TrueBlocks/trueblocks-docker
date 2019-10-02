import { combineReducers } from 'redux'
import systemStatus from './systemStatus'
import monitorStatus from './monitorStatus'
import getIndexData from './getIndexData'
import getSettings from './getSettings'
import monitorAdd from './monitorAdd'
import monitorRemove from './monitorRemove'

export default combineReducers({
  systemStatus,
  monitorStatus,
  getIndexData,
  getSettings,
  monitorAdd,
  monitorRemove
})
