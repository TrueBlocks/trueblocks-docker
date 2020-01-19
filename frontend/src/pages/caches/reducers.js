import * as ca from './actions';

//----------------------------------------------------------------------
const initialState = {
  data: null,
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
    case ca.TX_CACHE:
    case ca.BLOCK_CACHE:
    case ca.OVERVIEW:
      return {
        ...state,
        data: action.payload.data[0].caches,
        fieldList: action.payload.fieldList,
        meta: action.payload.meta,
        isLoading: false,
        error: null
      };

    case ca.ABI_CACHE:
      return {
        ...state,
        data: action.payload.data[0].caches[0].items,
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
        meta: null,
        isLoading: false,
        error: action.err
      };

    default:
      return state;
  }
}