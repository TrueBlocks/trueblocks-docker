export const GETSTATUS_BEGIN = 'monitorAdd/GETSTATUS_BEGIN'
export const GETSTATUS_SUCCESS = 'monitorAdd/GETSTATUS_SUCCESS'
export const GETSTATUS_FAILURE = 'monitorAdd/GETSTATUS_FAILURE'

const initialState = {
  isConnected: false,
  isLoading: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GETSTATUS_BEGIN:
      return {
        ...state,
        isLoading: true
      }

    case GETSTATUS_SUCCESS:
      console.log("success");
      return {
        ...state,
        isLoading: false,
        isConnected: true,
        // monitorStatus: action.payload
      }

    case GETSTATUS_FAILURE:
        return {
            ...state,
            isLoading: false,
            error: "Could not remove monitor"
        }

    default:
      return state
  }
}

const getData = (endpoint, address) => {
  console.log("ok")
  return fetch(`${endpoint}/list?address_list=${address}`)
}

export const monitorAdd = (address) => {
  console.log("ok...1")
    return (dispatch, getState) => {
      console.log("ok...2")
        dispatch({
          type: GETSTATUS_BEGIN
        })
        let state = getState();
        return getData(state.settingsManager.apiProvider, address)
            .then(async res => {
                let json = await res.json();
                console.log(json);
                
                return dispatch({
                    type: GETSTATUS_SUCCESS,
                    payload: json
                })
            })
            .catch((e) => {
                dispatch({
                    type: GETSTATUS_FAILURE,
                })
            })
      }
}
