import { queryAPI } from '../../utils';

//----------------------------------------------------------------
const BEGIN = 'monit/BEGIN';
const SUCCESS = 'monit/SUCCESS';
const FAILURE = 'monit/FAILURE';

//----------------------------------------------------------------
const initialState = {
  monitorStatus: {},
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
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
export const dispatcher_Addresses = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().reducer_Settings.apiProvider, 'status', 'modes=monitors&details&ether')
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
