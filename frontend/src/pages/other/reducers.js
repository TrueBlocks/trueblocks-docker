import * as ot from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null,
  menu: ot.other_menu
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

    case ot.SUBGROUPS:
    case ot.GROUPS:
    case ot.GENERATED:
    case ot.KNOWN:
    case ot.CUSTOM:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    // EXISTING_CODE
    // EXISTING_CODE

    case ot.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.err,
        data: null
      };

    default:
      return state;
  }
}