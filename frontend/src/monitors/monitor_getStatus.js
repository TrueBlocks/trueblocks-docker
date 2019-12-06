//----------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  monitorStatus: {}
};

//----------------------------------------------------------------
const MONITOR_STATUS_BEGIN = 'monitorStatus/BEGIN';
const MONITOR_STATUS_SUCCESS = 'monitorStatus/SUCCESS';
const MONITOR_STATUS_FAILURE = 'monitorStatus/FAILURE';

//----------------------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
    case MONITOR_STATUS_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case MONITOR_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        monitorStatus: action.payload
      };

    case MONITOR_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.e,
        monitorStatus: {}
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------
const getData = (endpoint) => {
  return fetch(`${endpoint}/status?modes=monitors&details&ether`);
};

//----------------------------------------------------------------
export const getMonitorStatus = () => {
  return (dispatch, getState) => {
    dispatch({
      type: MONITOR_STATUS_BEGIN
    });

    return getData(getState().getSettings.apiProvider)
      .then(async (res) => {
        let json = await res.json();
        json = json.data[0].caches[0];
        dispatch({
          type: MONITOR_STATUS_SUCCESS,
          payload: json
        });
        return json;
      })
      .catch((e) => {
        dispatch({
          type: MONITOR_STATUS_FAILURE,
          e
        });
      });
  };
};
