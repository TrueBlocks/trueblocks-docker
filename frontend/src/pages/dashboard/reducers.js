import * as da from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null
};

//----------------------------------------------------------------------
export default function reducer_Dashboard(state = initialState, action) {
  switch (action.type) {
    case da.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null
      };

    case da.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

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
};