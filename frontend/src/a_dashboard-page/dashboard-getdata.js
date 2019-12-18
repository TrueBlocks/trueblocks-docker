import { queryAPI } from '../utils';

//----------------------------------------------------------------
const BEGIN = 'dashb/BEGIN';
const SUCCESS = 'dashb/SUCCESS';
const FAILURE = 'dashb/FAILURE';

//----------------------------------------------------------------
const initialState = {
  names: [],
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  var ret;
  switch (action.type) {
    case BEGIN:
      ret = { ...state, isLoading: true };
      return ret;

    case SUCCESS:
      ret = { ...state, names: action.payload, isLoading: false, error: null };
      return ret;

    case FAILURE:
      ret = { ...state, isLoading: false, error: action.e };
      return ret;

    default:
      return state;
  }
};

//----------------------------------------------------------------
export const dispatcher_Dashboard = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().reducer_Settings.apiProvider, 'names', 'custom&expand')
      .then(async (res) => {
        let json = await res.json();
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
