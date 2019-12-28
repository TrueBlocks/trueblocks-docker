import * as [{TWO2}] from './actions';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: null
};

//----------------------------------------------------------------------
export default function reducer_[{PROPER}](state = initialState, action) {
  switch (action.type) {
    case [{TWO2}].BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null
      };

    case [{TWO2}].SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    case [{TWO2}].FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.err,
        data: null
      };

    default:
      return state;
  }
};
