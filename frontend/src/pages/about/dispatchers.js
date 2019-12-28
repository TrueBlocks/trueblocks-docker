import * as ab from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_About = (options) => {
  return (dispatch, getState) => {
    dispatch({
      type: ab.BEGIN
    });

    return Utils.queryAPI_get('ping', options)
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: ab.SUCCESS,
            payload: json
          });
          return json;
        }
      })
      .catch((err) => {
        dispatch({
          type: ab.FAILURE,
          err
        });
      });
  };
};