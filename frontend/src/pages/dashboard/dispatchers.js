import * as da from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Dashboard = (options) => {
  return (dispatch, getState) => {
    dispatch({
      type: da.BEGIN
    });

    return Utils.queryAPI_get('names', options)
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: da.SUCCESS,
            payload: json
          });
          return json;
        }
      })
      .catch((err) => {
        dispatch({
          type: da.FAILURE,
          err
        });
      });
  };
};
