import * as ca from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null,
  menu: ca.caches_menu
};

//----------------------------------------------------------------------
export default function reducer_Caches(state = initialState, action) {
  switch (action.type) {
    case ca.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case ca.SLURPS:
    case ca.TRACES:
    case ca.TRANSACTIONS:
    case ca.BLOCKS:
    case ca.OVERVIEW:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload[0].caches
      };

    // EXISTING_CODE
    // EXISTING_CODE

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
}