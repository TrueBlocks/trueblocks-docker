import * as ca from './actions';

//----------------------------------------------------------------------
const initialState = {
  menu: ca.caches_menu,
  data: null,
  fieldList: null,
  meta: null,
  isLoading: false,
  error: null
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
    case ca.TRACE_CACHE:
    case ca.TRANSACTION_CACHE:
    case ca.BLOCK_CACHE:
    case ca.CACHE_OVERVIEW:
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

    case ca.FAILURE:
      return {
        ...state,
        data: null,
        fieldList: null,
        meta: null,
        isLoading: false,
        error: action.err
      };

    default:
      return state;
  }
}