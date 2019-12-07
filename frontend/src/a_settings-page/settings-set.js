//----------------------------------------------------------------
const SETSETTINGS_BEGIN = 'setSettings/SETSETTINGS_BEGIN';
const SETSETTINGS_SUCCESS = 'setSettings/SETSETTINGS_SUCCESS';
const SETSETTINGS_FAILURE = 'setSettings/SETSETTINGS_FAILURE';

//----------------------------------------------------------------
const initialState = {
  res: {},
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  console.log("settings-set", state, action);
  switch (action.type) {
    case SETSETTINGS_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case SETSETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        res: action.payload
      };

    case SETSETTINGS_FAILURE:
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
      type: SETSETTINGS_BEGIN
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
          type: SETSETTINGS_SUCCESS,
          payload: data
        });
        return data;
      })
      .catch((e) => {
        dispatch({
          type: SETSETTINGS_FAILURE
        });
      });
  };
};
