export const CHANGESETTINGS_SUCCESS = 'settingsManager/CHANGESETTINGS_SUCCESS'
export const CHANGESETTINGS_FAILURE = 'settingsManager/CHANGESETTINGS_FAILURE'

const initialState = {
  apiProvider: "http://localhost:8080"
}

export default (state = initialState, action) => {
  console.log("reducer was called")
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
    return (dispatch) => {
        dispatch({
            type: CHANGESETTINGS_SUCCESS,
            payload: newVal
        })
    }
}