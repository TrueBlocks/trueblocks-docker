import * as se from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Settings = (options) => {
  return (dispatch, getState) => {
    dispatch({
      type: se.BEGIN
    });

    return Utils.queryAPI_get('config', options)
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: se.SUCCESS,
            payload: json.data[0]
          });
          return json.data[0];
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