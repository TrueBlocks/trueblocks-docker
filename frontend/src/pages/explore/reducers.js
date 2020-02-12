import * as ex from './actions';

//----------------------------------------------------------------------
const initialState = {
  data: null,
  meta: null,
  isLoading: false,
  error: null
};

//----------------------------------------------------------------------
export default function reducer_Explore(state = initialState, action) {
  // EXISTING_CODE
  if (action.type.includes('addrs=')) {
    return {
      ...state,
      data: action.payload.data[0],
      fieldList: action.payload.types[0].fields,
      meta: action.payload.meta,
      isLoading: false,
      error: null
    };
  }
  // EXISTING_CODE

  switch (action.type) {
    case ex.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case ex.TRACES:
    case ex.LOGS:
    case ex.RECEIPTS:
    case ex.TRANSACTIONS:
    case ex.BLOCKS:
    case ex.ACCOUNTS:
    case ex.DASHBOARD:
      return {
        ...state,
        data: action.payload.data,
        fieldList: action.payload.types[0].fields,
        meta: action.payload.meta,
        isLoading: false,
        error: null
      };

    // EXISTING_CODE
    // EXISTING_CODE

    case ex.FAILURE:
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
