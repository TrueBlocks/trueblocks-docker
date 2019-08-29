export const GETSTATUS_BEGIN = 'chainStatus/GETSTATUS_BEGIN'
export const GETSTATUS_SUCCESS = 'chainStatus/GETSTATUS_SUCCESS'
export const GETSTATUS_FAILURE = 'chainStatus/GETSTATUS_FAILURE'

const initialState = {
  chainStatus: {},
  isConnected: false,
  isLoading: false,
  error: null,
}

export default (state = initialState, action) => {
  console.log("reducer was called")
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
        chainStatus: action.payload
      }

    case GETSTATUS_FAILURE:
        return {
            ...state,
            isLoading: false,
            chainStatus: {}
        }

    default:
      return state
  }
}

const getData = (endpoint) => {
  return fetch(`${endpoint}/status?mode_list=monitors`)
}

export const getChainStatus = () => {
    return (dispatch, getState) => {
        dispatch({
          type: GETSTATUS_BEGIN
        })
    
        let state = getState();
        console.log(state.settingsManager.apiProvider);
        return getData(state.settingsManager.apiProvider)
            .then(async res => {
                console.log("ok...")
                let json = await res.json();
                json = json.meta;
                console.log(json);
                dispatch({
                    type: GETSTATUS_SUCCESS,
                    payload: json
                })
                return json
            })
            .catch((e) => {
                dispatch({
                    type: GETSTATUS_FAILURE,
                })
            })
      }
}
