import * as se from './actions';

//----------------------------------------------------------------------
const initialState = {
  data: null,
  meta: null,
  isLoading: false,
  error: null
};

//----------------------------------------------------------------------
export default function reducer_Settings(state = initialState, action) {
  // EXISTING_CODE
  // EXISTING_CODE

  switch (action.type) {
    case se.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case se.LICENSES:
    case se.FORMATS:
    case se.SKINS:
    case se.DASHBOARD:
      return {
        ...state,
        data: action.payload.data,
        fieldList: action.payload.types[0].fields,
        meta: action.payload.meta,
        isLoading: false,
        error: null
      };

    case se.CONFIGURATION:
      return {
        ...state,
        data: action.payload.data[0],
        fieldList: action.payload.types[0].fields,
        meta: action.payload.meta,
        isLoading: false,
        error: null
      };

    // EXISTING_CODE
    // EXISTING_CODE

    case se.FAILURE:
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
