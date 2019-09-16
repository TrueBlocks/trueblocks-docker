export const SETSETTINGS_BEGIN = 'trueblocks/SETSETTINGS_BEGIN'
export const SETSETTINGS_SUCCESS = 'trueblocks/SETSETTINGS_SUCCESS'
export const SETSETTINGS_FAILURE = 'trueblocks/SETSETTINGS_FAILURE'

const initialState = {
  res: {},
  isLoading: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SETSETTINGS_BEGIN:
      return {
        ...state,
        isLoading: true
      }

    case SETSETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        res: action.payload
      }

    case SETSETTINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}

export const setSettings = (newJsonSettings) => {
  return (dispatch, getState) => {
    console.log("ok something")
    dispatch({
      type: SETSETTINGS_BEGIN
    })
    let state = getState();
    let url = `${state.settingsManager.apiProvider}/status?config-put=${newJsonSettings}`
    console.log(`config settings hitting ${url}`)
    return fetch(url)
      .then(async res => {
        const json = await res.json()
        const data = json.data[0]
        console.log(data)
        dispatch({
          type: SETSETTINGS_SUCCESS,
          payload: data
        })
        return data
      })
      .catch((e) => {
        dispatch({
          type: SETSETTINGS_FAILURE,
        })
      })
  }
}
