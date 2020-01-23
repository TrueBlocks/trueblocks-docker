import * as [{TWO}] from './actions';

//----------------------------------------------------------------------
const initialState = {
  data: null,
  meta: null,
  isLoading: false,
  error: null
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
        data: null,
        meta: null,
        isLoading: false,
        error: action.err
      };

    default:
      return state;
  }
}