import { combineReducers } from 'redux';

//------------------------------------------------------------------------
import reducer_Status from './components/status-actions';
import reducer_SidePanels from './components/side-panels-actions';
[{IMPORTS}]
//------------------------------------------------------------------------
export default combineReducers({
  reducer_Status,
[{REDUCERS}]
});
