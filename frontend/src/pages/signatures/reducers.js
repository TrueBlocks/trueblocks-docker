import * as si from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null
};

//----------------------------------------------------------------------
export default function reducer_Signatures(state = initialState, action) {
  switch (action.type) {
    case si.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null
      };

    case si.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    case si.FAILURE:
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