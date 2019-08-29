export const GETSTATUS_BEGIN = 'trueblocks/GETSTATUS_BEGIN'
export const GETSTATUS_SUCCESS = 'trueblocks/GETSTATUS_SUCCESS'
export const GETSTATUS_FAILURE = 'trueblocks/GETSTATUS_FAILURE'


const initialState = {
  systemData: {},
  chainData: {},
  endpoint: "http://localhost:8080",
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
        systemData: action.payload
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


// const getFakeData = () => {
//     return new Promise(resolve => {
//         // Resolve after a timeout so we can see the loading indicator
//         setTimeout(
//             () => {
//                 resolve(fakeData)
//             },
//             1000
//         );
//         });
// }

const getData = (endpoint) => {
  return fetch(`${endpoint}/status`)
}

export const getStatus = () => {
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
                json = json.data[0][0];
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
