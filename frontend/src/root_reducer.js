//------------------------------------------------------------------------
import reducer_SystemStatus from './z_components/connection_reducer';
import AddressIndex_reducer from './a_address-index-page/address-index-getdata';
import reducer_Monitors from './a_monitors-page/monitors-getdata';
import reducer_MonitorRemove from './a_monitors-page/monitors-remove';
import reducer_MonitorAdd from './a_monitors-page/monitors-add';
import getSettings from './a_settings-page/settings-get';

//------------------------------------------------------------------------
import { combineReducers } from 'redux';
export default combineReducers({
  reducer_SystemStatus,
  reducer_Monitors,
  reducer_MonitorRemove,
  reducer_MonitorAdd,
  AddressIndex_reducer,
  getSettings
});
