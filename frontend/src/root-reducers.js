import { combineReducers } from 'redux';

//------------------------------------------------------------------------
import reducer_Status from './components/PanelStatus/reducers';
import reducer_Panels from './components/PanelBase/reducers';
import reducer_LastLocation from './last-location-actions';
import reducer_MainMenu from './components/MainMenu/reducers';
import reducer_Dashboard from './pages/dashboard/reducers';
import reducer_Monitors from './pages/monitors/reducers';
import reducer_Names from './pages/names/reducers';
import reducer_Explore from './pages/explore/reducers';
import reducer_Digests from './pages/digests/reducers';
import reducer_Caches from './pages/caches/reducers';
import reducer_Settings from './pages/settings/reducers';
import reducer_Support from './pages/support/reducers';
import reducer_Addresses from './pages/addresses/reducers';

//------------------------------------------------------------------------
export default combineReducers({
  reducer_Status,
  reducer_Panels,
  reducer_LastLocation,
  reducer_MainMenu,
  reducer_Dashboard,
  reducer_Monitors,
  reducer_Names,
  reducer_Explore,
  reducer_Digests,
  reducer_Caches,
  reducer_Settings,
  reducer_Support,
  reducer_Addresses
});
