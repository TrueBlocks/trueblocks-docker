import { combineReducers } from 'redux';

//------------------------------------------------------------------------
import reducer_Status from './components/panels/status-actions';
import reducer_SidePanels from './components/panels/side-panel-actions';
import reducer_LastLocation from './last-location-actions';
[{IMPORTS}]
//------------------------------------------------------------------------
export default combineReducers({
  reducer_Status,
  reducer_SidePanels,
  reducer_LastLocation,
[{REDUCERS}]
});
