const Utils = require('../../utils');

//----------------------------------------------------------------------
const BEGIN = 'setting/BEGIN';
const SUCCESS = 'setting/SUCCESS';
const FAILURE = 'setting/FAILURE';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  configSettings: {}
};

//----------------------------------------------------------------------
export default function reducer_Settings(state = initialState, action) {
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        configSettings: {}
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        configSettings: action.payload
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.err,
        configSettings: {}
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------------
export const dispatcher_Settings = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return Utils.queryAPI_get('config', 'get')
      .then(async (result) => {
        let json = await result.json();
        dispatch({
          type: SUCCESS,
          payload: json.data[0]
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