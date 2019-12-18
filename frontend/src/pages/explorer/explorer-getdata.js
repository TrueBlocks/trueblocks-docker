import { queryAPI } from '../../utils';

//----------------------------------------------------------------------
const BEGIN = 'explore/BEGIN';
const SUCCESS = 'explore/SUCCESS';
const FAILURE = 'explore/FAILURE';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  blocks: {}
};

//----------------------------------------------------------------------
export default (state = initialState, action) => {
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
        error: action.e,
        blocks: {}
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------------
export const dispatcher_Explorer = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().reducer_Settings.apiProvider, 'blocks', 'blocks=latest')
      .then(async (res) => {
        let json = await res.json();
        dispatch({
          type: SUCCESS,
          payload: json
        });
        return json;
      })
      .catch((e) => {
        dispatch({
          type: FAILURE,
          e
        });
      });
  };
};