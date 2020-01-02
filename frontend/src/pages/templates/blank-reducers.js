import * as [{TWO}] from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null,
  menu: [{TWO}].[{LOWER}]_menu
};

//----------------------------------------------------------------------
export default function reducer_[{PROPER}](state = initialState, action) {
  switch (action.type) {
    case [{TWO}].BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

[{REDUCERS}]    // EXISTING_CODE
    // EXISTING_CODE

    case [{TWO}].FAILURE:
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
