import * as ad from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null
};

//----------------------------------------------------------------------
export default function reducer_Addresses(state = initialState, action) {
  switch (action.type) {
    case ad.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case ad.SUCCESS:
      console.log(action);
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    case ad.REMOVE:
      return {
        ...state,
        isLoading: false,
        error: null
      };

    case ad.FAILURE:
      console.log(action);
      return {
        ...state,
        isLoading: false,
        error: action.err,
        data: null
      };

    default:
      return state;
  }
}
