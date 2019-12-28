import * as su from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Support = (options) => {
  return (dispatch, getState) => {
    dispatch({
      type: su.BEGIN
    });

    return Utils.queryAPI_get('ping', options)
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: su.SUCCESS,
            payload: json
          });
          return json;
        }
      })
      .catch((err) => {
        dispatch({
          type: su.FAILURE,
          err
        });
      });
  };
};