import * as su from './actions';

//----------------------------------------------------------------------
const initialState = {
  data: null,
  meta: null,
  isLoading: false,
  error: null
};

//----------------------------------------------------------------------
export default function reducer_Support(state = initialState, action) {
  // EXISTING_CODE
  // EXISTING_CODE

  switch (action.type) {
    case su.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case su.ABOUT_US:
    case su.CONTACT_US:
    case su.DOCUMENTATION:
    case su.PER_INCIDENT:
    case su.FREE_SUPPORT:
    case su.DASHBOARD:
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

    case su.FAILURE:
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
