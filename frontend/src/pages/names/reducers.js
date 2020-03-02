import * as na from './actions';

//----------------------------------------------------------------------
const initialState = {
  data: null,
  meta: null,
  isLoading: false,
  error: null
};

//----------------------------------------------------------------------
export default function reducer_Names(state = initialState, action) {
  // EXISTING_CODE
  // EXISTING_CODE

  switch (action.type) {
    case na.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case na.DATED_BLOCKS:
    case na.KNOWN_BLOCKS:
    case na.YOUR_BLOCKS:
    case na.CROSS:
    case na.PARAMS:
    case na.NAMES:
    case na.COMMON:
    case na.DOWNLOADED:
    case na.GROUPS:
    case na.OTHER_NAMES:
    case na.PREFUNDS:
    case na.TOKENS:
    case na.WALLETS:
    case na.YOUR_NAMES:
    case na.DASHBOARD:
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

    case na.FAILURE:
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
