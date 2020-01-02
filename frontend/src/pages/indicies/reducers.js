import * as ind from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null,
  menu: ind.indicies_menu
};

//----------------------------------------------------------------------
export default function reducer_Indicies(state = initialState, action) {
  switch (action.type) {
    case ind.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case ind.SHARED:
    case ind.COLUMNS:
    case ind.UNRIPE:
    case ind.STAGED:
    case ind.FINALIZED:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload[0].caches
      };

    // EXISTING_CODE
    // EXISTING_CODE

    case ind.FAILURE:
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