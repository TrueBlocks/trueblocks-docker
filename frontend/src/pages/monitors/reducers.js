import * as mo from './actions';

//----------------------------------------------------------------------
const initialState = {
  data: null,
  meta: null,
  isLoading: false,
  error: null
};

//----------------------------------------------------------------------
export default function reducer_Monitors(state = initialState, action) {
  // EXISTING_CODE
  // EXISTING_CODE

  switch (action.type) {
    case mo.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case mo.DAEMON:
    case mo.DASHBOARD:
      return {
        ...state,
        data: action.payload.data,
        fieldList: action.payload.types[0].fields,
        meta: action.payload.meta,
        isLoading: false,
        error: null
      };

    case mo.SCRAPER:
      return {
        ...state,
        data: action.payload.data[0].caches,
        fieldList: action.payload.types[1].fields,
        meta: action.payload.meta,
        isLoading: false,
        error: null
      };

    case mo.ADDRESSES:
    case mo.PROJECTS:
      return {
        ...state,
        data: action.payload.data[0].caches[0].items,
        fieldList: action.payload.types[1].fields,
        meta: action.payload.meta,
        isLoading: false,
        error: null
      };

    // EXISTING_CODE
    // EXISTING_CODE

    case mo.FAILURE:
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
