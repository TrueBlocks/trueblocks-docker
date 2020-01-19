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
      return {
        ...state,
        data: action.payload.data,
        fieldList: action.payload.fieldList,
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