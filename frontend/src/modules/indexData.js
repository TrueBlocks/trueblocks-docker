export const GETSTATUS_BEGIN = 'indexData/GETSTATUS_BEGIN'
export const GETSTATUS_SUCCESS = 'indexData/GETSTATUS_SUCCESS'
export const GETSTATUS_FAILURE = 'indexData/GETSTATUS_FAILURE'

const initialState = {
  indexData: {},
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
        indexData: action.payload
      }

    case GETSTATUS_FAILURE:
        return {
            ...state,
            isLoading: false,
            indexData: {}
        }

    default:
      return state
  }
}

const getData = (endpoint) => {
  return fetch(`${endpoint}/status?mode_list=index&details`)
}

export const getIndexData = () => {
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
                json = json.data[0][0].caches[0];
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
