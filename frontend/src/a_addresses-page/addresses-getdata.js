import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const BEGIN = 'addrindx/BEGIN';
const SUCCESS = 'addrindx/SUCCESS';
const FAILURE = 'addrindx/FAILURE';

//----------------------------------------------------------------
const initialState = {
  indexData: {},
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  var ret;
  switch (action.type) {
    case BEGIN:
      ret = { ...state, isLoading: true };
      return { ...state, isLoading: true };

    case SUCCESS:
      ret = { ...state, isLoading: false, error: null, indexData: action.payload };
      //console.log('addrindx', 'okay', ret.indexData);
      return ret;

    case FAILURE:
      ret = { ...state, isLoading: false, error: action.e, indexData: {} };
      //console.log('addrindex', 'fail', ret.indexData);
      return ret;

    default:
      //console.log('addrindex', 'defl', state, action);
      return state;
  }
};

//----------------------------------------------------------------
export const dispatcher_AddressIndex = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'status', 'modes=index&details')
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
