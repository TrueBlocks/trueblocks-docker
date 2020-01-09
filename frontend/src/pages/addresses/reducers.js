import * as ad from './actions';
import { addresses_menu } from './dispatchers';

//----------------------------------------------------------------------
const initialState = {
  menu: addresses_menu,
  data: null,
  fieldList: null,
  meta: null,
  isLoading: false,
  error: null
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
    case ad.TOKENS:
    case ad.OWNED:
    case ad.NAMES:
      console.log('reducer -> ', action, state);
      return {
        ...state,
        data: action.payload.data,
        fieldList: action.payload.fieldList,
        meta: action.payload.meta,
        isLoading: false,
        error: null
      };

    case ad.MONITORS:
      return {
        ...state,
        data: action.payload.data[0].caches[0].items,
        fieldList: action.payload.fieldList,
        meta: action.payload.meta,
        isLoading: false,
        error: null
      };

    // EXISTING_CODE
    // EXISTING_CODE

    case ad.FAILURE:
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
