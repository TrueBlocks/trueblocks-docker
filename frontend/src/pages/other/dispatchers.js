import * as ot from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Other = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: ot.BEGIN
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
          type: ot.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const other_menu = {
  page: 'Other',
  submenu: [
    { menu_text: 'Custom', value: 'VAL', active: false, action: ot.CUSTOM },
    { menu_text: 'Known', value: 'VAL', active: false, action: ot.KNOWN },
    { menu_text: 'Generated', value: 'VAL', active: false, action: ot.GENERATED },
    { menu_text: 'Prices', value: 'VAL', active: false, action: ot.PRICES },
    { menu_text: 'Groups', value: 'VAL', active: false, action: ot.GROUPS },
    { menu_text: 'ot-0005' },
    { menu_text: 'ot-0006' }
  ],
  active: false,
  color: 'orange',
  dispatcher: dispatcher_Other
};

// EXISTING_CODE
// EXISTING_CODE
