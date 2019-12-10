import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const BEGIN = 'connectn/BEGIN';
const SUCCESS = 'connectn/SUCCESS';
const FAILURE = 'connectn/FAILURE';

//----------------------------------------------------------------
const initialState = {
  systemData: {},
  unripe: -1,
  staging: -1,
  finalized: -1,
  client: -1,
  isConnected: false,
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default function reducer_Connection(state = initialState, action) {
  //console.log('connectn', action, state);
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
        unripe: action.payload.meta.unripe,
        staging: action.payload.meta.staging,
        finalized: action.payload.meta.finalized,
        client: action.payload.meta.client
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        isConnected: false,
        error: `Connection error: ${action.e}`,
        systemData: {},
        unripe: -1,
        staging: -1,
        finalized: -1,
        client: -1
      };

    default:
      return state;
  }
}

//----------------------------------------------------------------
export const dispatcher_Connection = () => {
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
