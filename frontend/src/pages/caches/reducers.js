import * as ca from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null
};

//----------------------------------------------------------------------
export default function reducer_Caches(state = initialState, action) {
  switch (action.type) {
    case ca.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null
      };

    case ca.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    case ca.FAILURE:
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