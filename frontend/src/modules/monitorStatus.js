export const GETSTATUS_BEGIN = 'monitorStatus/GETSTATUS_BEGIN'
export const GETSTATUS_SUCCESS = 'monitorStatus/GETSTATUS_SUCCESS'
export const GETSTATUS_FAILURE = 'monitorStatus/GETSTATUS_FAILURE'

const initialState = {
  monitorStatus: {items: []},
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
      return {
        ...state,
        isLoading: false,
        monitorStatus: action.payload
      }

    case GETSTATUS_FAILURE:
        return {
            ...state,
            isLoading: false,
            monitorStatus: {}
        }

    default:
      return state
  }
}

const getData = (endpoint) => {
  return fetch(`${endpoint}/status?mode_list=monitors&details&ether`)
}

export const getMonitorStatus = () => {
    return (dispatch, getState) => {
        dispatch({
          type: GETSTATUS_BEGIN
        })
    
        let state = getState();
        return getData(state.getSettings.apiProvider)
            .then(async res => {
                let json = await res.json();
                json = json.data[0][0].caches[0];
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
