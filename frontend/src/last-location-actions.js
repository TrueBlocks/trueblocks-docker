//----------------------------------------------------------------
export const SET = 'lastLocation/SET';

//----------------------------------------------------------------
const initialState = {
  lastLocation: ''
};

//----------------------------------------------------------------
export default function reducer_LastLocation(state = initialState, action) {
  switch (action.type) {
    case SET:
      return {
        ...state,
        lastLocation: action.lastLocation
      };

    default:
      return state;
  }
}
