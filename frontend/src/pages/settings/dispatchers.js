import * as se from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Settings = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: se.BEGIN
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
          type: se.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const settings_menu = {
  page: 'Settings',
  submenu: [
    { menu_text: 'Configuration', value: 'VAL', active: false, action: se.CONFIGURATION },
    { menu_text: 'Skins', value: 'VAL', active: false, action: se.SKINS },
    { menu_text: 'Licenses', value: 'VAL', active: false, action: se.LICENSES },
    { menu_text: 'se-0003' },
    { menu_text: 'se-0004' },
    { menu_text: 'se-0005' },
    { menu_text: 'se-0006' }
  ],
  active: false,
  color: 'pink',
  dispatcher: dispatcher_Settings
};

// EXISTING_CODE
// EXISTING_CODE
