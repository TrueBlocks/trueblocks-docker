import * as ex from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null
};

//----------------------------------------------------------------------
export default function reducer_Explore(state = initialState, action) {
  switch (action.type) {
    case ex.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null
      };

    case ex.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    case ex.FAILURE:
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