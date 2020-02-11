const { queryAPI_get } = require('utils');

//----------------------------------------------------------------
const BEGIN = 'conne/BEGIN';
const SUCCESS = 'conne/SUCCESS';
const FAILURE = 'conne/FAILURE';

//----------------------------------------------------------------
const initialState = {
  systemData: {},
  unripe: -1,
  staging: -1,
  finalized: -1,
  client: -1,
  isConnected: false,
  error: null
};

//----------------------------------------------------------------
export default function reducer_Status(state = initialState, action) {
  if (action.payload && action.payload.errors) {
    var errMsg = action.payload.errors[0].replace('|', '\n');
    if (errMsg.indexOf("Couldn't connect to server") !== -1) {
      errMsg += ' Is your Ethereum node running?';
    }
    action = {
      err: errMsg,
      type: FAILURE
    };
  }

  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        error: null
      };

    case SUCCESS:
      return {
        ...state,
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
        isConnected: false,
        error: action.err + ' ', // don't remove, converts to string
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
export const dispatcher_Status = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI_get('status', 'modes=some')
      .then(async (res) => {
        const json = await res.json();
        if (json.errors) {
          throw json.errors[0];
        } else if (!json.data) {
          throw new Error('no data returned from API');
        }
        dispatch({
          type: SUCCESS,
          payload: { data: json.data[0], meta: json.meta }
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
