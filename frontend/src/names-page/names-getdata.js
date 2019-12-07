import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const NAMES_BEGIN = 'names/NAMES_BEGIN';
const NAMES_SUCCESS = 'names/NAMES_SUCCESS';
const NAMES_FAILURE = 'names/NAMES_FAILURE';

//----------------------------------------------------------------
const initialState = {
  indexData: {},
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  console.log('names', state, action);
  switch (action.type) {
    case NAMES_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case NAMES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        indexData: action.payload
      };

    case NAMES_FAILURE:
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
export const Names_reducer = () => {
  return (dispatch, getState) => {
    dispatch({
      type: NAMES_BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'ping', '')
      .then(async (res) => {
        let json = await res.json();
        dispatch({
          type: NAMES_SUCCESS,
          payload: json
        });
        return json;
      })
      .catch((e) => {
        dispatch({
          type: NAMES_FAILURE,
          e
        });
      });
  };
};
