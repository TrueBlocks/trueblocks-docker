import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const BEGIN = 'names___/BEGIN';
const SUCCESS = 'names___/SUCCESS';
const FAILURE = 'names___/FAILURE';

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
      //console.log('names___', 'star', ret.names);
      return ret;

    case SUCCESS:
      ret = { ...state, names: action.payload, isLoading: false, error: null };
      //console.log('names___', 'okay', ret.names);
      return ret;

    case FAILURE:
      ret = { ...state, isLoading: false, error: action.e };
      //console.log('names___', 'fail', ret.names);
      return ret;

    default:
      //console.log('names___', 'defl', state, action);
      return state;
  }
};

//----------------------------------------------------------------
export const dispatcher_Names = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'names', 'custom&expand')
      .then(async (res) => {
        let json = await res.json();
        console.log(json);
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
