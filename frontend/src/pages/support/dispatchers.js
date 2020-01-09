import * as su from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Support = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: su.BEGIN
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
          type: su.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const support_menu = {
  page: 'Support',
  submenu: [
    { menu_text: 'Free Teir', value: 'VAL', active: false, action: su.FREE_TEIR },
    { menu_text: 'Pay Teir', value: 'VAL', active: false, action: su.PAY_TEIR },
    { menu_text: 'Documentation', value: 'VAL', active: false, action: su.DOCUMENTATION },
    { menu_text: 'Connect Us', value: 'VAL', active: false, action: su.CONNECT_US },
    { menu_text: 'About', value: 'VAL', active: false, action: su.ABOUT },
    { menu_text: 'su-0005' },
    { menu_text: 'su-0006' }
  ],
  active: false,
  color: 'purple',
  dispatcher: dispatcher_Support
};

// EXISTING_CODE
// EXISTING_CODE
