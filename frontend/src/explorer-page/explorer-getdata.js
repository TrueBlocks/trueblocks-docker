import { queryAPI } from '../utils';

//----------------------------------------------------------------
const BEGIN = 'explo/BEGIN';
const SUCCESS = 'explo/SUCCESS';
const FAILURE = 'explo/FAILURE';

//----------------------------------------------------------------
const initialState = {
  blocks: {},
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true,
        blocks: {}
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        blocks: action.payload
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.e,
        blocks: {}
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------
export const dispatcher_Explorer = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().reducer_Connection.apiProvider, 'blocks', 'blocks=latest')
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
