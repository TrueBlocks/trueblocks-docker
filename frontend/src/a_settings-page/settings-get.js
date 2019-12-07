import config from '../config.json';
import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const GETSETTINGS_BEGIN = 'getSettings/GETSETTINGS_BEGIN';
const GETSETTINGS_SUCCESS = 'getSettings/GETSETTINGS_SUCCESS';
const GETSETTINGS_FAILURE = 'getSettings/GETSETTINGS_FAILURE';

//----------------------------------------------------------------
const initialState = {
  systemSettings: {},
  isLoading: false,
  error: null,
  apiProvider: config.apiProvider
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  console.log('settings-get', state, action);
  switch (action.type) {
    case GETSETTINGS_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case GETSETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        systemSettings: action.payload
      };

    case GETSETTINGS_FAILURE:
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
export const getSettings = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GETSETTINGS_BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'config', 'get')
      .then(async (res) => {
        const json = await res.json();
        const data = json.data[0];
        dispatch({
          type: GETSETTINGS_SUCCESS,
          payload: data
        });
        return data;
      })
      .catch((e) => {
        dispatch({
          type: GETSETTINGS_FAILURE,
          e
        });
      });
  };
};
