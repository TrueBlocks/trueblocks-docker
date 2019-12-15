import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const initialState = {
  monitorStatus: {},
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
const BEGIN = 'moniStat/BEGIN';
const SUCCESS = 'moniStat/SUCCESS';
const FAILURE = 'moniStat/FAILURE';

//----------------------------------------------------------------
export default (state = initialState, action) => {
  //console.log('moniStat', action, state);
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        monitorStatus: action.payload
      };

    case FAILURE:
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
export const dispatcher_Monitor = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'status', 'modes=monitors&details&ether')
      .then(async (res) => {
        let json = await res.json();
        json = json.data[0].caches[0];
        dispatch({
          type: SUCCESS,
          payload: json
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
