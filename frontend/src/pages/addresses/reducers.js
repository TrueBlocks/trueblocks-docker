import * as ad from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null,
  menu: ad.addresses_menu
};

//----------------------------------------------------------------------
export default function reducer_Addresses(state = initialState, action) {
  switch (action.type) {
    case ad.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case ad.OTHER:
    case ad.PREFUNDS:
    case ad.KNOWN_TOKENS:
    case ad.OWNED_ADDRESSES:
    case ad.CUSTOM_NAMES:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    case ad.MONITORED:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload[0].caches[0].items
      };

    // EXISTING_CODE
    // EXISTING_CODE

    case ad.FAILURE:
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