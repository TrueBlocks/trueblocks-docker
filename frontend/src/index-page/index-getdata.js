import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const BEGIN = 'index__/BEGIN';
const SUCCESS = 'index__/SUCCESS';
const FAILURE = 'index__/FAILURE';

//----------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  //console.log('index__', action, state);
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true
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

//----------------------------------------------------------------
export const Index_reducer = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'ping', '')
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
