import { queryAPI } from '../../utils';

//----------------------------------------------------------------------
const BEGIN = '[{SEVEN}]/BEGIN';
const SUCCESS = '[{SEVEN}]/SUCCESS';
const FAILURE = '[{SEVEN}]/FAILURE';

//----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null[{GLOBAL_STATE1}]
};

//----------------------------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null[{GLOBAL_STATE2}]
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null[{GLOBAL_STATE3}]
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.e[{GLOBAL_STATE2}]
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------------
export const dispatcher_[{PROPER}] = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().reducer_Settings.apiProvider, '[{QUERY_URL}]', '[{QUERY_OPTS}]')
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
