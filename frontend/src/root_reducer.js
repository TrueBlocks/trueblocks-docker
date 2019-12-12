//------------------------------------------------------------------------
import reducer_Connection from './z_components/connection-getdata';
import reducer_AddressIndex from './a_addresses-page/addresses-getdata';
import reducer_Monitors from './a_monitors-page/monitors-getdata';
import reducer_Names from './a_names-page/names-getdata';
import reducer_Explorer from './explorer-page/explorer-getdata';
import getSettings from './a_settings-page/settings-get';

//------------------------------------------------------------------------
import { combineReducers } from 'redux';
export default combineReducers({
  reducer_Connection,
  reducer_Monitors,
  reducer_Names,
  reducer_AddressIndex,
  reducer_Explorer,
  getSettings
});
