import * as ind from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Indicies = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: ind.BEGIN
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
          type: ind.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const indicies_menu = {
  page: 'Indicies',
  submenu: [
    { menu_text: 'Finalized', value: 'VAL', active: false, action: ind.FINALIZED },
    { menu_text: 'Staged', value: 'VAL', active: false, action: ind.STAGED },
    { menu_text: 'Unripe', value: 'VAL', active: false, action: ind.UNRIPE },
    { menu_text: 'Columns', value: 'VAL', active: false, action: ind.COLUMNS },
    { menu_text: 'Shared', value: 'VAL', active: false, action: ind.SHARED },
    { menu_text: 'ind-0005' },
    { menu_text: 'ind-0006' }
  ],
  active: false,
  color: 'blue',
  dispatcher: dispatcher_Indicies
};

// EXISTING_CODE
// EXISTING_CODE
