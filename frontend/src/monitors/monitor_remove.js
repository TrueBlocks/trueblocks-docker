//----------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
const MONITOR_REMOVE_BEGIN = 'monitorRemove/BEGIN';
const MONITOR_REMOVE_SUCCESS = 'monitorRemove/SUCCESS';
const MONITOR_REMOVE_FAILURE = 'monitorRemove/FAILURE';

//----------------------------------------------------------------
export default (state = initialState, action) => {
  console.log(action.type, state);
  switch (action.type) {
    case MONITOR_REMOVE_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case MONITOR_REMOVE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    case MONITOR_REMOVE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: 'Could not remove monitor'
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------
const getData = (endpoint, address) => {
  return fetch(`${endpoint}/rm?address=${address}&yes`);
};

//----------------------------------------------------------------
export const reducer_MonitorRemove = (address) => {
  return (dispatch, getState) => {
    dispatch({
      type: MONITOR_REMOVE_BEGIN
    });
    return getData(getState().getSettings.apiProvider, address)
      .then(async (res) => {
        let json = await res.json();
        return dispatch({
          type: MONITOR_REMOVE_SUCCESS,
          payload: json
        });
      })
      .catch((e) => {
        dispatch({
          type: MONITOR_REMOVE_FAILURE
        });
      });
  };
};
