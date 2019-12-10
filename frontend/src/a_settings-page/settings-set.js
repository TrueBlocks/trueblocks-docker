//----------------------------------------------------------------
const BEGIN = 'setSetti/BEGIN';
const SUCCESS = 'setSetti/SUCCESS';
const FAILURE = 'setSetti/FAILURE';

//----------------------------------------------------------------
const initialState = {
  res: {},
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  //console.log('setSetti', action, state);
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
        res: action.payload
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------
export const setSettings = (jsonAsString) => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    let url = `${getState().getSettings.apiProvider}/config?set`;
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonAsString
    })
      .then(async (res) => {
        const json = await res.json();
        const data = json.data[0];
        dispatch({
          type: SUCCESS,
          payload: data
        });
        return data;
      })
      .catch((e) => {
        dispatch({
          type: FAILURE
        });
      });
  };
};
