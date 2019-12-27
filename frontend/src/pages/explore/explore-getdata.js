const Utils = require('../../utils');

//----------------------------------------------------------------------
const BEGIN = 'explore/BEGIN';
const SUCCESS = 'explore/SUCCESS';
const FAILURE = 'explore/FAILURE';

//----------------------------------------------------------------------
const initialExploreState = {
  isLoading: false,
  error: null,
  blocks: {}
};

//----------------------------------------------------------------------
export default function reducer_Explore(state = initialExploreState, action) {
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        blocks: {}
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        blocks: action.payload
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.err,
        blocks: {}
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------------
export const dispatcher_Explore = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return Utils.queryAPI_get('blocks', 'blocks=latest')
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