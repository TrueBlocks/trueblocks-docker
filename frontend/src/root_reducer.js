//------------------------------------------------------------------------
import systemStatus from './home/getSystemStatus';
import reducer_AddressIndex from './home/addrIndex_getData';
import monitorStatus from './monitors/monitorStatus';
import monitorAdd from './monitors/monitorAdd';
import monitorRemove from './monitors/monitorRemove';
import getSettings from './settings/getSettings';

//------------------------------------------------------------------------
import { combineReducers } from 'redux';
export default combineReducers({
  systemStatus,
  monitorStatus,
  reducer_AddressIndex,
  getSettings,
  monitorAdd,
  monitorRemove
});
