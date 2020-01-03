import * as ab from './actions';

//----------------------------------------------------------------------
const initialState = {
  menu: ab.about_menu,
  data: null,
  fieldList: null,
  meta: null,
  isLoading: false,
  error: null
};

//----------------------------------------------------------------------
export default function reducer_About(state = initialState, action) {
  switch (action.type) {
    case ab.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case ab.TEAM:
    case ab.PHILOSOPHY:
    case ab.ABOUT:
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

    case ab.FAILURE:
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