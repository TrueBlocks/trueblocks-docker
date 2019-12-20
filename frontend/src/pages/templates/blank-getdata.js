const Utils = require('../../utils');

//----------------------------------------------------------------------
const BEGIN = '[{SEVEN}]/BEGIN';
const SUCCESS = '[{SEVEN}]/SUCCESS';
const FAILURE = '[{SEVEN}]/FAILURE';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null[{GLOBAL_STATE1}]
};

//----------------------------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null[{GLOBAL_STATE2}]
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null[{GLOBAL_STATE3}]
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.err[{GLOBAL_STATE2}]
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------------
export const dispatcher_[{PROPER}] = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return Utils.queryAPI_get('[{QUERY_URL}]', '[{QUERY_OPTS}]')
      .then(async (result) => {
        let json = await result.json();
        dispatch({
          type: SUCCESS,
          payload: json[{QUERY_EXTRACT}]
        });
        return json;
      })
      .catch((err) => {
        dispatch({
          type: FAILURE,
          err
        });
      });
  };
};
