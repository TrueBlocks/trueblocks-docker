import * as su from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null
};

//----------------------------------------------------------------------
export default function reducer_Support(state = initialState, action) {
  switch (action.type) {
    case su.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null
      };

    case su.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    case su.FAILURE:
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