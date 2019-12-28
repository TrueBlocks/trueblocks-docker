import * as ot from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Other = (options) => {
  return (dispatch, getState) => {
    dispatch({
      type: ot.BEGIN
    });

    return Utils.queryAPI_get('ping', options)
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: ot.SUCCESS,
            payload: json
          });
          return json;
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