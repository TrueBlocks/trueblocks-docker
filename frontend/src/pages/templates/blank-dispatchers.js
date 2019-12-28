import * as [{TWO2}] from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_[{PROPER}] = (options) => {
  return (dispatch, getState) => {
    dispatch({
      type: [{TWO2}].BEGIN
    });

    return Utils.queryAPI_get('[{QUERY_URL}]', options)
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: [{TWO2}].SUCCESS,
            payload: json[{QUERY_EXTRACT}]
          });
          return json[{QUERY_EXTRACT}];
        }
      })
      .catch((err) => {
        dispatch({
          type: [{TWO2}].FAILURE,
          err
        });
      });
  };
};
