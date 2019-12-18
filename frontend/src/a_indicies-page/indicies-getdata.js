import { queryAPI } from '../utils';

//----------------------------------------------------------------
const BEGIN = 'indic/BEGIN';
const SUCCESS = 'indic/SUCCESS';
const FAILURE = 'indic/FAILURE';

//----------------------------------------------------------------
const initialState = {
  indexData: {},
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
        indexData: action.payload
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.e,
        indexData: {}
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------
export const dispatcher_Indicies = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().reducer_Settings.apiProvider, 'status', 'modes=index&details')
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
