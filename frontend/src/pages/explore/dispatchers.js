import * as ex from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Explore = (options) => {
  return (dispatch, getState) => {
    dispatch({
      type: ex.BEGIN
    });

    return Utils.queryAPI_get('blocks', options)
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: ex.SUCCESS,
            payload: json
          });
          return json;
        }
      })
      .catch((err) => {
        dispatch({
          type: ex.FAILURE,
          err
        });
      });
  };
};