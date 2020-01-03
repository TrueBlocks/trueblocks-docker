import * as ad from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Addresses = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: ad.BEGIN
    });

    var res = action.split('/');
    return Utils.queryAPI_get(res[0], res[1])
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: action,
            payload: json
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: ad.FAILURE,
          err
        });
      });
  };
};

// EXISTING_CODE
//----------------------------------------------------------------
export const dispatcher_RemoveMonitor = (address, remove) => {
  return (dispatch, getState) => {
    return Utils.queryAPI_get('rm', 'address=' + address + (remove ? '&yes' : ''))
      .then(async (res) => {
        return dispatch({
          type: ad.REMOVE
        });
      })
      .catch((err) => {
        dispatch({
          type: ad.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------
export const dispatcher_AddMonitor = (address) => {
  return (dispatch, getState) => {
    dispatch({
      type: ad.BEGIN
    });

    return Utils.queryAPI_get('list', 'addrs=' + address)
      .then(async (res) => {
        let json = await res.json();
        return dispatch({
          type: ad.ADD,
          payload: json
        });
      })
      .catch((err) => {
        dispatch({
          type: ad.FAILURE,
          err
        });
      });
  };
};
// EXISTING_CODE