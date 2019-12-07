import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const GETSTATUS_BEGIN = 'indexData/GETSTATUS_BEGIN';
const GETSTATUS_SUCCESS = 'indexData/GETSTATUS_SUCCESS';
const GETSTATUS_FAILURE = 'indexData/GETSTATUS_FAILURE';

//----------------------------------------------------------------
const initialState = {
  indexData: {},
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  console.log('address-index', state, action);
  switch (action.type) {
    case GETSTATUS_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case GETSTATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        indexData: action.payload
      };

    case GETSTATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        indexData: {},
        error: action.e
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------
export const AddressIndex_reducer = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GETSTATUS_BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'status', 'modes=index&details')
      .then(async (res) => {
        let json = await res.json();
        json = json.data[0].caches[0];
        dispatch({
          type: GETSTATUS_SUCCESS,
          payload: json
        });
        return json;
      })
      .catch((e) => {
        dispatch({
          type: GETSTATUS_FAILURE,
          e
        });
      });
  };
};
