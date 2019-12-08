//----------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
const BEGIN = 'monitAdd/BEGIN';
const SUCCESS = 'monitAdd/SUCCESS';
const FAILURE = 'monitAdd/FAILURE';

//----------------------------------------------------------------
export default function monitorAddReducer(state = initialState, action) {
  console.log('monitAdd', action, state);
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    case FAILURE:
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
      type: BEGIN
    });

    return getMonitorData(getState().getSettings.apiProvider, address)
      .then(async (res) => {
        let json = await res.json();
        return dispatch({
          type: SUCCESS,
          payload: json
        });
      })
      .catch((e) => {
        dispatch({
          type: FAILURE
        });
      });
  };
};
