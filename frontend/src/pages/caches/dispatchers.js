import * as ca from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Caches = (options) => {
  return (dispatch, getState) => {
    dispatch({
      type: ca.BEGIN
    });

    return Utils.queryAPI_get('status', options)
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: ca.SUCCESS,
            payload: json.data[0].caches
          });
          return json.data[0].caches;
        }
      })
      .catch((err) => {
        dispatch({
          type: ca.FAILURE,
          err
        });
      });
  };
};