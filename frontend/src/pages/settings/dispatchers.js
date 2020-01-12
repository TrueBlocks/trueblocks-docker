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
  page: 'settings',
  items: [
    { subpage: 'configuration', route: 'settings', query: se.CONFIGURATION },
    { subpage: 'skins', route: 'settings', query: se.SKINS },
    { subpage: 'licenses', route: 'settings', query: se.LICENSES },
    { subpage: 'se-0003' },
    { subpage: 'se-0004' },
    { subpage: 'se-0005' },
    { subpage: 'se-0006' }
  ],
  color: 'pink'
};

// EXISTING_CODE
// EXISTING_CODE