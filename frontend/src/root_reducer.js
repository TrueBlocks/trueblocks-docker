//------------------------------------------------------------------------
import reducer_Connection from './components/connection-getdata';
import reducer_Dashboard from './a_dashboard-page/dashboard-getdata';
import reducer_Addresses from './a_addresses-page/addresses-getdata';
import reducer_Indicies from './a_indicies-page/indicies-getdata';
import reducer_Explorer from './explorer-page/explorer-getdata';
import reducer_Settings from './settings-page/settings-getdata-get';

//------------------------------------------------------------------------
import { combineReducers } from 'redux';
export default combineReducers({
  reducer_Connection,
  reducer_Dashboard,
  reducer_Addresses,
  reducer_Indicies,
  reducer_Explorer,
  reducer_Settings
});
