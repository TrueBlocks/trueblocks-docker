import { combineReducers } from 'redux';
import systemStatus from './systemStatus';
import reducer_AddressIndex from './addr_index_getData';
import getSettings from './getSettings';
import monitorStatus from '../containers/monitors/monitorStatus';
import monitorAdd from '../containers/monitors/monitorAdd';
import monitorRemove from '../containers/monitors/monitorRemove';

export default combineReducers({
  systemStatus,
  monitorStatus,
  reducer_AddressIndex,
  getSettings,
  monitorAdd,
  monitorRemove
});
