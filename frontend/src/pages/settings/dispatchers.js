import * as se from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Settings = (str) => {
  return (dispatch, getState) => {
    dispatch({
      type: se.BEGIN
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
    { subpage: 'dashboard', route: 'dashboard', query: se.DASHBOARD },
    { subpage: 'configuration', route: 'settings', query: se.CONFIGURATION },
    { subpage: 'skins', route: 'settings', query: se.SKINS },
    { subpage: 'formats', route: 'settings', query: se.FORMATS },
    { subpage: 'licenses', route: '', query: se.LICENSES },
    { subpage: 'se-0005' },
    { subpage: 'se-0006' }
  ],
  expanded: false,
  color: 'pink'
};

// EXISTING_CODE
// EXISTING_CODE