import { combineReducers } from 'redux';

//------------------------------------------------------------------------
import reducer_Connection from './components/connection-getdata';
import reducer_Dashboard from './pages/dashboard/dashboard-getdata';
import reducer_Addresses from './pages/addresses/addresses-getdata';
import reducer_Explore from './pages/explore/explore-getdata';
import reducer_Caches from './pages/caches/reducers';
import reducer_Indicies from './pages/indicies/indicies-getdata';
import reducer_Settings from './pages/settings/settings-getdata';

//------------------------------------------------------------------------
export default combineReducers({
  reducer_Connection,
  reducer_Dashboard,
  reducer_Addresses,
  reducer_Explore,
  reducer_Caches,
  reducer_Indicies,
  reducer_Settings
});
