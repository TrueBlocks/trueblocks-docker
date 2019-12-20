const Utils = require('../../utils');

//----------------------------------------------------------------------
const BEGIN = 'indicie/BEGIN';
const SUCCESS = 'indicie/SUCCESS';
const FAILURE = 'indicie/FAILURE';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  indexData: {}
};

//----------------------------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        indexData: {}
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        indexData: action.payload
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.err,
        indexData: {}
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------------
export const dispatcher_Indicies = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return Utils.queryAPI_get('status', 'modes=index&details')
      .then(async (result) => {
        let json = await result.json();
        dispatch({
          type: SUCCESS,
          payload: json.data[0].caches[0]
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