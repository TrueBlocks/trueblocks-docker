import * as se from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Settings = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: se.BEGIN
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
          type: se.FAILURE,
          err
        });
      });
  };
};

// EXISTING_CODE
// EXISTING_CODE