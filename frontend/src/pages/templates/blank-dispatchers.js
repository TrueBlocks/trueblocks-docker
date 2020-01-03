import * as [{TWO}] from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_[{PROPER}] = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: [{TWO}].BEGIN
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
          type: [{TWO}].FAILURE,
          err
        });
      });
  };
};

// EXISTING_CODE
// EXISTING_CODE
