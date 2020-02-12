import * as ot from './actions';

//----------------------------------------------------------------------
const initialState = {
  data: null,
  meta: null,
  isLoading: false,
  error: null
};

//----------------------------------------------------------------------
export default function reducer_Other(state = initialState, action) {
  // EXISTING_CODE
  // EXISTING_CODE

  switch (action.type) {
    case ot.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case ot.GROUPS:
    case ot.PRICES:
    case ot.GENERATED:
    case ot.KNOWN:
    case ot.CUSTOM:
    case ot.DASHBOARD:
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

    case ot.FAILURE:
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
