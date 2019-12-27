const Utils = require('../../utils');

//----------------------------------------------------------------------
const BEGIN = 'other__/BEGIN';
const SUCCESS = 'other__/SUCCESS';
const FAILURE = 'other__/FAILURE';

//----------------------------------------------------------------------
const initialOtherState = {
  isLoading: false,
  error: null
};

//----------------------------------------------------------------------
export default function reducer_Other(state = initialOtherState, action) {
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.err
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------------
export const dispatcher_Other = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return Utils.queryAPI_get('ping', '')
      .then(async (result) => {
        let json = await result.json();
        dispatch({
          type: SUCCESS,
          payload: json
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