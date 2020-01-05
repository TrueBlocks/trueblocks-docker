import * as su from './actions';

//----------------------------------------------------------------------
const initialState = {
  menu: su.support_menu,
  data: null,
  fieldList: null,
  meta: null,
  isLoading: false,
  error: null
};

//----------------------------------------------------------------------
export default function reducer_Support(state = initialState, action) {
  switch (action.type) {
    case su.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case su.ABOUT:
    case su.CONNECT_US:
    case su.DOCUMENTATION:
    case su.PAY_TEIR:
    case su.FREE_TEIR:
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

    case su.FAILURE:
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