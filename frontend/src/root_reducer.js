import { combineReducers } from 'redux';

//------------------------------------------------------------------------
import reducer_Connection from './components/connection-getdata';
import reducer_Dashboard from './pages/dashboard/reducers';
import reducer_Addresses from './pages/addresses/reducers';
import reducer_Explore from './pages/explore/reducers';
import reducer_Indicies from './pages/indicies/indicies-getdata';
import reducer_Signatures from './pages/signatures/reducers';
import reducer_Caches from './pages/caches/reducers';
import reducer_Other from './pages/other/reducers';
import reducer_Settings from './pages/settings/reducers';
import reducer_Support from './pages/support/reducers';
import reducer_About from './pages/about/reducers';
//------------------------------------------------------------------------
export default combineReducers({
  reducer_Connection,
  reducer_Dashboard,
  reducer_Addresses,
  reducer_Explore,
  reducer_Indicies,
  reducer_Signatures,
  reducer_Caches,
  reducer_Other,
  reducer_Settings,
  reducer_Support,
  reducer_About
});
