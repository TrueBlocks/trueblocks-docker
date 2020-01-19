import * as da from './actions';

//----------------------------------------------------------------------
const initialState = {
  data: null,
  meta: null,
  isLoading: false,
  error: null
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
        data: null,
        meta: null,
        isLoading: false,
        error: action.err
      };

    default:
      return state;
  }
}