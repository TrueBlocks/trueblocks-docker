import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const EXPLORER_BEGIN = 'explorer/EXPLORER_BEGIN';
const EXPLORER_SUCCESS = 'explorer/EXPLORER_SUCCESS';
const EXPLORER_FAILURE = 'explorer/EXPLORER_FAILURE';

//----------------------------------------------------------------
const initialState = {
  indexData: {},
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  console.log('explorer', state, action);
  switch (action.type) {
    case EXPLORER_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case EXPLORER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        indexData: action.payload
      };

    case EXPLORER_FAILURE:
      return {
        ...state,
        isLoading: false,
        indexData: {},
        error: action.e
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------
export const Explorer_reducer = () => {
  return (dispatch, getState) => {
    dispatch({
      type: EXPLORER_BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'ping', '')
      .then(async (res) => {
        let json = await res.json();
        dispatch({
          type: EXPLORER_SUCCESS,
          payload: json
        });
        return json;
      })
      .catch((e) => {
        dispatch({
          type: EXPLORER_FAILURE,
          e
        });
      });
  };
};
