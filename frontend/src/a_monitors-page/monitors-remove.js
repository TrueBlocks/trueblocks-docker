import queryAPI from '../z_utils/queryAPI';

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
  console.log('monitors-remove', state, action);
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
export const reducer_MonitorRemove = (address) => {
  return (dispatch, getState) => {
    dispatch({
      type: MONITOR_REMOVE_BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'rm', 'address=' + address + '&yes')
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
