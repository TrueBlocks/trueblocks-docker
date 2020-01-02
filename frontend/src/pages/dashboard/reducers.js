import * as da from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null,
  menu: da.dashboard_menu
};

//----------------------------------------------------------------------
export default function reducer_Dashboard(state = initialState, action) {
  switch (action.type) {
    case da.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    // EXISTING_CODE
    // EXISTING_CODE

    case da.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.err,
        data: null
      };

    default:
      return state;
  }
}