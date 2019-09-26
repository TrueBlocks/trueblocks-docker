export const GETSTATUS_BEGIN = 'trueblocks/GETSTATUS_BEGIN'
export const GETSTATUS_SUCCESS = 'trueblocks/GETSTATUS_SUCCESS'
export const GETSTATUS_FAILURE = 'trueblocks/GETSTATUS_FAILURE'


const initialState = {
  systemData: {},
  chainStatus: {},
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
      return {
        ...state,
        isLoading: false,
        isConnected: true,
        systemData: action.payload.data,
        chainStatus: action.payload.meta
      }

    case GETSTATUS_FAILURE:
        return {
            ...state,
            isLoading: false,
            systemData: {}
        }

    default:
      return state
  }
}

const getData = (endpoint) => {
  return fetch(`${endpoint}/status`)
}

export const getStatus = () => {
    return (dispatch, getState) => {
        dispatch({
          type: GETSTATUS_BEGIN
        })
        let state = getState();
        return getData(state.getSettings.apiProvider)
            .then(async res => {
                const json = await res.json()
                const data = json.data[0]
                const meta = json.meta
                dispatch({
                    type: GETSTATUS_SUCCESS,
                    payload: {data, meta}
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
