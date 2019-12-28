import * as ab from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null
};

//----------------------------------------------------------------------
export default function reducer_About(state = initialState, action) {
  switch (action.type) {
    case ab.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null
      };

    case ab.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    case ab.FAILURE:
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