//----------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
const MONITOR_ADD_BEGIN = 'monitorAdd/BEGIN';
const MONITOR_ADD_SUCCESS = 'monitorAdd/SUCCESS';
const MONITOR_ADD_FAILURE = 'monitorAdd/FAILURE';

//----------------------------------------------------------------
export default function monitorAddReducer(state = initialState, action) {
  console.log(action.type, state);
  switch (action.type) {
    case MONITOR_ADD_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case MONITOR_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    case MONITOR_ADD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: 'Could not add monitor'
      };

    default:
      return state;
  }
}

//----------------------------------------------------------------
const getMonitorData = (endpoint, address) => {
  return fetch(`${endpoint}/list?addrs=${address}`);
};

//----------------------------------------------------------------
export const reducer_MonitorAdd = (address) => {
  return (dispatch, getState) => {
    dispatch({
      type: MONITOR_ADD_BEGIN
    });
    return getMonitorData(getState().getSettings.apiProvider, address)
      .then(async (res) => {
        let json = await res.json();
        return dispatch({
          type: MONITOR_ADD_SUCCESS,
          payload: json
        });
      })
      .catch((e) => {
        dispatch({
          type: MONITOR_ADD_FAILURE
        });
      });
  };
};
