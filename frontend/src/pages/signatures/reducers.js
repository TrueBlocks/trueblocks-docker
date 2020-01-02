import * as si from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null,
  menu: si.signatures_menu
};

//----------------------------------------------------------------------
export default function reducer_Signatures(state = initialState, action) {
  switch (action.type) {
    case si.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case si.ABIS:
    case si.GENERATED_SIGNATURES:
    case si.KNOWN_SIGNATURES:
    case si.FROM_MONITORS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    // EXISTING_CODE
    // EXISTING_CODE

    case si.FAILURE:
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