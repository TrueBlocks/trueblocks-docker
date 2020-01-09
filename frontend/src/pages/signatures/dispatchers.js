import * as si from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Signatures = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: si.BEGIN
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
          type: si.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const signatures_menu = {
  page: 'Signatures',
  submenu: [
    { menu_text: 'Downloaded', value: 'VAL', active: false, action: si.DOWNLOADED },
    { menu_text: 'Common', value: 'VAL', active: false, action: si.COMMON },
    { menu_text: 'Generated', value: 'VAL', active: false, action: si.GENERATED },
    { menu_text: 'si-0003' },
    { menu_text: 'si-0004' },
    { menu_text: 'si-0005' },
    { menu_text: 'si-0006' }
  ],
  active: false,
  color: 'green',
  dispatcher: dispatcher_Signatures
};

// EXISTING_CODE
// EXISTING_CODE
