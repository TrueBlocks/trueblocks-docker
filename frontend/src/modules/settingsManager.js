import config from '../config.json'
export const GETSETTINGS_BEGIN = 'trueblocks/GETSETTINGS_BEGIN'
export const GETSETTINGS_SUCCESS = 'trueblocks/GETSETTINGS_SUCCESS'
export const GETSETTINGS_FAILURE = 'trueblocks/GETSETTINGS_FAILURE'


const initialState = {
  systemSettings: {},
  isConnected: false,
  isLoading: false,
  error: null,
  apiProvider: config.apiProvider
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GETSETTINGS_BEGIN:
      return {
        ...state,
        isLoading: true
      }

    case GETSETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isConnected: true,
        systemSettings: action.payload
      }

    case GETSETTINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}

const getData = (endpoint) => {
  return fetch(`${endpoint}/config?get`)
}

export const getSettings = () => {
  return (dispatch, getState) => {
    console.log("ok something")
    dispatch({
      type: GETSETTINGS_BEGIN
    })
    let state = getState();
    return getData(state.settingsManager.apiProvider)
      .then(async res => {
        const json = await res.json()
        const data = json.data[0]
        console.log(data)
        dispatch({
          type: GETSETTINGS_SUCCESS,
          payload: data
        })
        return data
      })
      .catch((e) => {
        dispatch({
          type: GETSETTINGS_FAILURE,
        })
      })
  }
}
