import fakeData from "./fakeData.json";
export const GETSTATUS_BEGIN = 'trueblocks/GETBLOCK_REQUESTED'
export const GETSTATUS_SUCCESS = 'trueblocks/GETBLOCK_SUCCESS'
export const GETSTATUS_FAILURE = 'trueblocks/GETBLOCK_FAILURE'


const initialState = {
  data: [],
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
        data: action.payload
      }

    case GETSTATUS_FAILURE:
        return {
            ...state,
            isLoading: false,
            data: []
        }

    default:
      return state
  }
}


const fakeGetStatus = () => {
    return new Promise(resolve => {
        // Resolve after a timeout so we can see the loading indicator
        setTimeout(
            () => {
            resolve(fakeData)
            },
            1000
        );
        });
}

export const getStatus = () => {
    return dispatch => {
        dispatch({
          type: GETSTATUS_BEGIN
        })
    
        return fakeGetStatus()
            .then(async res => {
                console.log("ok...")
                let json = res;
                // let json = await res.json();
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

// export const getBlockAsync = () => {
//     console.log("Fire!!!")
//   return dispatch => {
//     dispatch({
//       type: GETBLOCK_BEGIN
//     })

//     return fetch("http://localhost:8080/blocks?block_list=1010102")
//         .then(async res => {
//             console.log("ok...")
//             let json = await res.json();
//             dispatch({
//                 type: GETBLOCK_SUCCESS,
//                 payload: json
//             })
//             return json
//         })
//         .catch((e) => {
//             dispatch({
//                 type: GETBLOCK_FAILURE,
//             })
//         })
//   }
// }