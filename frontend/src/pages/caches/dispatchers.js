import * as ca from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Caches = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: ca.BEGIN
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
          type: ca.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const caches_menu = {
  page: 'Caches',
  submenu: [
    { menu_text: 'Overview', value: 'VAL', active: false, action: ca.OVERVIEW },
    { menu_text: 'Block Cache', value: 'VAL', active: false, action: ca.BLOCK_CACHE },
    { menu_text: 'Tx Cache', value: 'VAL', active: false, action: ca.TX_CACHE },
    { menu_text: 'Trace Cache', value: 'VAL', active: false, action: ca.TRACE_CACHE },
    { menu_text: 'Slurps', value: 'VAL', active: false, action: ca.SLURPS },
    { menu_text: 'Abi Cache', value: 'VAL', active: false, action: ca.ABI_CACHE },
    { menu_text: 'ca-0006' }
  ],
  active: false,
  color: 'tan',
  dispatcher: dispatcher_Caches
};

// EXISTING_CODE
// EXISTING_CODE
