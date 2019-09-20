import config from '../config.json'
export const CHANGESETTINGS_SUCCESS = 'settingsManager/CHANGESETTINGS_SUCCESS'
export const CHANGESETTINGS_FAILURE = 'settingsManager/CHANGESETTINGS_FAILURE'

const initialState = {
  apiProvider: config.apiProvider
}

export default (state = initialState, action) => {
  switch (action.type) {

    case CHANGESETTINGS_SUCCESS:
      console.log("success");
      return {
        ...state,
        apiProvider: action.payload
      }

    case CHANGESETTINGS_FAILURE:
        return {
            ...state,
        }

    default:
      return state
  }
}

export const changeApiProvider = (newVal) => {
    console.log("hey", newVal)
    return (dispatch) => {
        dispatch({
            type: CHANGESETTINGS_SUCCESS,
            payload: newVal
        })
    }
}
