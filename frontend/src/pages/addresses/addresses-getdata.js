const Utils = require('../../utils');

//----------------------------------------------------------------------
const BEGIN = 'address/BEGIN';
const SUCCESS = 'address/SUCCESS';
const FAILURE = 'address/FAILURE';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  monitorStatus: {}
};

//----------------------------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        monitorStatus: {}
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        monitorStatus: action.payload
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.err,
        monitorStatus: {}
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------------
export const dispatcher_Addresses = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return Utils.queryAPI_get('status', 'modes=monitors&details&ether')
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