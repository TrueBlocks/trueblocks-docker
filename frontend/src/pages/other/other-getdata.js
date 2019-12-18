import { queryAPI } from '../../utils';

//----------------------------------------------------------------------
const BEGIN = 'other__/BEGIN';
const SUCCESS = 'other__/SUCCESS';
const FAILURE = 'other__/FAILURE';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null
};

//----------------------------------------------------------------------
export default (state = initialState, action) => {
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
        error: action.e
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

    return queryAPI(getState().reducer_Settings.apiProvider, 'ping', '')
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