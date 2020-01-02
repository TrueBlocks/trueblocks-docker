import * as ab from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null,
  menu: ab.about_menu
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
        isLoading: false,
        error: null,
        data: action.payload
      };

    // EXISTING_CODE
    // EXISTING_CODE

    case ab.FAILURE:
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