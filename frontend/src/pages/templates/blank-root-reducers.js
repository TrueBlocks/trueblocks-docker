import { combineReducers } from 'redux';

//------------------------------------------------------------------------
import reducer_Status from './components/PanelStatus/reducers';
import reducer_Panels from './components/PanelBase/reducers';
import reducer_LastLocation from './last-location-actions';
import reducer_MainMenu from './components/MainMenu/reducers';
[{REDIMPORTS}]
//------------------------------------------------------------------------
export default combineReducers({
  reducer_Status,
  reducer_Panels,
  reducer_LastLocation,
  reducer_MainMenu,
[{REDUCERS}]
});
