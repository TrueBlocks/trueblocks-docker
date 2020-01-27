import { combineReducers } from 'redux';

//------------------------------------------------------------------------
import reducer_Status from './components/panels/status-actions';
import reducer_SidePanels from './components/SidePanel/reducers';
import reducer_LastLocation from './last-location-actions';
import reducer_MainMenu from './components/MainMenu/reducers';
[{REDIMPORTS}]
//------------------------------------------------------------------------
export default combineReducers({
  reducer_Status,
  reducer_SidePanels,
  reducer_LastLocation,
  reducer_MainMenu,
[{REDUCERS}]
});
