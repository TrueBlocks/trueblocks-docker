import * as ca from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Caches = (options) => {
  return (dispatch, getState) => {
    dispatch({
      type: ca.CA_BEGIN
    });

    return Utils.queryAPI_get('status', options)
      .then(async (result) => {
        let json = await result.json();
        dispatch({
          type: ca.CA_SUCCESS,
          payload: json.data[0].caches
        });
        return json.data[0].caches;
      })
      .catch((err) => {
        dispatch({
          type: ca.CA_FAILURE,
          err
        });
      });
  };
};
