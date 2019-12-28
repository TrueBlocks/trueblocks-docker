import * as si from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Signatures = (options) => {
  return (dispatch, getState) => {
    dispatch({
      type: si.BEGIN
    });

    return Utils.queryAPI_get('ping', options)
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: si.SUCCESS,
            payload: json
          });
          return json;
        }
      })
      .catch((err) => {
        dispatch({
          type: si.FAILURE,
          err
        });
      });
  };
};