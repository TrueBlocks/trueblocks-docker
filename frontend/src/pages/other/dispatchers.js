import * as ot from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Other = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: ot.BEGIN
    });

    var res = action.split('/');
    return Utils.queryAPI_get(res[0], res[1])
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: action,
            payload: json
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: ot.FAILURE,
          err
        });
      });
  };
};

// EXISTING_CODE
// EXISTING_CODE