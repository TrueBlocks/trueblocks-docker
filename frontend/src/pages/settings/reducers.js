import * as se from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null
};

//----------------------------------------------------------------------
export default function reducer_Settings(state = initialState, action) {
  switch (action.type) {
    case se.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null
      };

    case se.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    case se.FAILURE:
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