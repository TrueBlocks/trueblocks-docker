import * as ot from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null
};

//----------------------------------------------------------------------
export default function reducer_Other(state = initialState, action) {
  switch (action.type) {
    case ot.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null
      };

    case ot.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    case ot.FAILURE:
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