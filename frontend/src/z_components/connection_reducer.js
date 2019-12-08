import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const BEGIN = 'connectn/BEGIN';
const SUCCESS = 'connectn/SUCCESS';
const FAILURE = 'connectn/FAILURE';

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
  console.log('=============================================');
  console.log('connectn', action, state);
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        error: null,
        isLoading: true
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        isConnected: true,
        error: null,
        systemData: action.payload.data,
        chainStatus: action.payload.meta
      };

    case FAILURE:
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
export const refreshStatusPanel = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'status', 'modes=all')
      .then(async (res) => {
        const json = await res.json();
        const data = json.data[0];
        const meta = json.meta;
        dispatch({
          type: SUCCESS,
          payload: { data, meta }
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
