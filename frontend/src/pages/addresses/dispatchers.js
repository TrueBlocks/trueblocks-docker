import * as ad from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Addresses = (str) => {
  return (dispatch, getState) => {
    dispatch({
      type: ad.BEGIN
    });

    var array = str.split('?');
    return Utils.queryAPI_get(array[0], array[1])
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: array[1],
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

//----------------------------------------------------------------------
export const addresses_menu = {
  page: 'addresses',
  items: [
    { subpage: 'monitors', route: 'status', query: ad.MONITORS },
    { subpage: 'names', route: 'names', query: ad.NAMES },
    { subpage: 'owned', route: 'names', query: ad.OWNED },
    { subpage: 'tokens', route: 'names', query: ad.TOKENS },
    { subpage: 'prefunds', route: 'names', query: ad.PREFUNDS },
    { subpage: 'other', route: 'names', query: ad.OTHER },
    { subpage: 'ad-0006' }
  ],
  color: 'pink'
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
          type: ad.CREATE,
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