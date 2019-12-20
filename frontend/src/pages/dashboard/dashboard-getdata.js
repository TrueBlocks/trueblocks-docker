const Utils = require('../../utils');

//----------------------------------------------------------------------
const BEGIN = 'dashboa/BEGIN';
const SUCCESS = 'dashboa/SUCCESS';
const FAILURE = 'dashboa/FAILURE';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  names: []
};

//----------------------------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        names: []
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        names: action.payload
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.err,
        names: []
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------------
export const dispatcher_Dashboard = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return Utils.queryAPI_get('names', 'custom&expand')
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