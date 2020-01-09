import * as ex from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Explore = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: ex.BEGIN
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
          type: ex.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const explore_menu = {
  page: 'Explore',
  submenu: [
    { menu_text: 'Accounts', value: 'VAL', active: false, action: ex.ACCOUNTS },
    { menu_text: 'Blocks', value: 'VAL', active: false, action: ex.BLOCKS },
    { menu_text: 'Transactions', value: 'VAL', active: false, action: ex.TRANSACTIONS },
    { menu_text: 'Receipts', value: 'VAL', active: false, action: ex.RECEIPTS },
    { menu_text: 'Logs', value: 'VAL', active: false, action: ex.LOGS },
    { menu_text: 'Traces', value: 'VAL', active: false, action: ex.TRACES },
    { menu_text: 'ex-0006' }
  ],
  active: false,
  color: 'purple',
  dispatcher: dispatcher_Explore
};

// EXISTING_CODE
// EXISTING_CODE
