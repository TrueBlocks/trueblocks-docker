import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const GETSTATUS_BEGIN = 'connection/GETSTATUS_BEGIN';
const GETSTATUS_SUCCESS = 'connection/GETSTATUS_SUCCESS';
const GETSTATUS_FAILURE = 'connection/GETSTATUS_FAILURE';

//----------------------------------------------------------------
const initialState = {
  systemData: {},
  chainStatus: {},
  isConnected: false,
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  console.log('connection', state, action);
  switch (action.type) {
    case GETSTATUS_BEGIN:
      return {
        ...state,
        error: null,
        isLoading: true
      };

    case GETSTATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isConnected: true,
        error: null,
        systemData: action.payload.data,
        chainStatus: action.payload.meta
      };

    case GETSTATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isConnected: false,
        error: `Connection error: ${action.e}`,
        systemData: {},
        chainStatus: {}
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------
export const getConnectionStatus = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GETSTATUS_BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'status', 'modes=all')
      .then(async (res) => {
        const json = await res.json();
        const data = json.data[0];
        const meta = json.meta;
        dispatch({
          type: GETSTATUS_SUCCESS,
          payload: { data, meta }
        });
        return json;
      })
      .catch((e) => {
        dispatch({
          type: GETSTATUS_FAILURE,
          e
        });
      });
  };
};
