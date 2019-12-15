import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const BEGIN = 'explorer/BEGIN';
const SUCCESS = 'explorer/SUCCESS';
const FAILURE = 'explorer/FAILURE';

//----------------------------------------------------------------
const initialState = {
  blocks: {},
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  //console.log('explorer', action, state);
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
