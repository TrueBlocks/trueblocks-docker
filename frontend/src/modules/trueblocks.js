export const GETBLOCK_BEGIN = 'trueblocks/GETBLOCK_REQUESTED'
export const GETBLOCK_SUCCESS = 'trueblocks/GETBLOCK_SUCCESS'
export const GETBLOCK_FAILURE = 'trueblocks/GETBLOCK_FAILURE'

const initialState = {
  data: [],
  isLoading: false,
  error: null
}

export default (state = initialState, action) => {
  console.log("ok good reducer was called")
  switch (action.type) {

    case GETBLOCK_BEGIN:
      return {
        ...state,
        isLoading: true
      }

    case GETBLOCK_SUCCESS:
      console.log("success");
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }

    case GETBLOCK_FAILURE:
        return {
            ...state,
            isLoading: false,
            data: []
        }

    default:
      return state
  }
}


export const getBlockAsync = () => {
    console.log("Fire!!!")
  return dispatch => {
    dispatch({
      type: GETBLOCK_BEGIN
    })

    return fetch("http://localhost:8080/blocks?block_list=1010102")
        .then(async res => {
            console.log("ok...")
            let json = await res.json();
            dispatch({
                type: GETBLOCK_SUCCESS,
                payload: json
            })
            return json
        })
        .catch((e) => {
            dispatch({
                type: GETBLOCK_FAILURE,
            })
        })
  }
}

