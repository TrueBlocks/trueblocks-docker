import * as ca from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: []
};

//----------------------------------------------------------------------
export default function reducer_Caches(state = initialState, action) {
  switch (action.type) {
    case ca.CA_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: []
      };

    case ca.CA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    case ca.CA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.err,
        data: []
      };

    default:
      return state;
  }
}
