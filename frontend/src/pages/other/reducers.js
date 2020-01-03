import * as ot from './actions';

//----------------------------------------------------------------------
const initialState = {
  menu: ot.other_menu,
  data: null,
  fieldList: null,
  meta: null,
  isLoading: false,
  error: null
};

//----------------------------------------------------------------------
export default function reducer_Other(state = initialState, action) {
  switch (action.type) {
    case ot.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case ot.GROUPS:
    case ot.GENERATED_BLOCKS:
    case ot.KNOWN_BLOCKS:
    case ot.CUSTOM_BLOCKS:
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

    case ot.FAILURE:
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