import * as ad from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Addresses = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: ad.BEGIN
    });

    var res = action.split('/');
    console.log('dispatcher --> r0', res[0], ' r1', res[1]);
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

//----------------------------------------------------------------------
export const addresses_menu = {
  page: 'Addresses',
  submenu: [
    { menu_text: 'Monitors', value: 'VAL', active: false, action: ad.MONITORS },
    { menu_text: 'Names', value: 'VAL', active: true, action: ad.NAMES },
    { menu_text: 'Owned', value: 'VAL', active: false, action: ad.OWNED },
    { menu_text: 'Tokens', value: 'VAL', active: false, action: ad.TOKENS },
    { menu_text: 'Prefunds', value: 'VAL', active: false, action: ad.PREFUNDS },
    { menu_text: 'Other', value: 'VAL', active: false, action: ad.OTHER },
    { menu_text: 'ad-0006' }
  ],
  active: false,
  color: 'pink',
  dispatcher: dispatcher_Addresses
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
