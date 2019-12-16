import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
const BEGIN = 'monitRem/BEGIN';
const SUCCESS = 'monitRem/SUCCESS';
const FAILURE = 'monitRem/FAILURE';

//----------------------------------------------------------------
export default (state = initialState, action) => {
  //console.log('monitRem', action, state);
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: 'Could not remove monitor'
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------
export const dispatcher_MonitorRemove = (address, remove) => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'rm', 'address=' + address + (remove ? '&yes' : ''))
      .then(async (res) => {
        let json = await res.json();
        return dispatch({
          type: SUCCESS,
          payload: json
        });
      })
      .catch((e) => {
        dispatch({
          type: FAILURE
        });
      });
  };
};
