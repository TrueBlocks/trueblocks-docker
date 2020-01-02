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

    case ot.SUBGROUP_NAMES:
    case ot.GROUP_NAMES:
    case ot.GENERATED_BLOCKS:
    case ot.KNOWN_BLOCKS:
    case ot.CUSTOM_BLOCKS:
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