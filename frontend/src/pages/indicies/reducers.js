import * as ind from './actions';
import { indicies_menu } from './dispatchers';

//----------------------------------------------------------------------
const initialState = {
  data: null,
  meta: null,
  isLoading: false,
  error: null
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
        data: action.payload.data[0].caches,
        fieldList: action.payload.fieldList,
        meta: action.payload.meta,
        isLoading: false,
        error: null
      };

    // EXISTING_CODE
    // EXISTING_CODE

    case ind.FAILURE:
      return {
        ...state,
        data: null,
        meta: null,
        isLoading: false,
        error: action.err
      };

    default:
      return state;
  }
}