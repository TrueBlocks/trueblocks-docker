import * as se from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null,
  menu: se.settings_menu
};

//----------------------------------------------------------------------
export default function reducer_Settings(state = initialState, action) {
  switch (action.type) {
    case se.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case se.LICENSES:
    case se.SKINS:
    case se.PRICE_QUOTES:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    case se.CONFIGURATION:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload[0]
      };

    // EXISTING_CODE
    // EXISTING_CODE

    case se.FAILURE:
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