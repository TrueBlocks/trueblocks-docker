//------------------------------------------------------------------------
import reducer_SystemStatus from './components/connection_reducer';
import reducer_AddressIndex from './home/addrIndex_getData';
import reducer_Monitors from './monitors/monitor_getStatus';
import reducer_MonitorRemove from './monitors/monitor_remove';
import reducer_MonitorAdd from './monitors/monitor_add';
import getSettings from './settings/getSettings';

//------------------------------------------------------------------------
import { combineReducers } from 'redux';
export default combineReducers({
  reducer_SystemStatus,
  reducer_Monitors,
  reducer_MonitorRemove,
  reducer_MonitorAdd,
  reducer_AddressIndex,
  getSettings
});
