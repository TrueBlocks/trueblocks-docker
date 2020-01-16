import * as [{TWO}] from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_[{PROPER}] = (route, query) => {
  return (dispatch, getState) => {
    dispatch({
      type: [{TWO}].BEGIN
    });

    return Utils.queryAPI_get(route, query)
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: query,
            payload: json
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: [{TWO}].FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const [{LOWER}]_menu = {
  page: '[{LOWER}]',
  items: [
[{MENU_ITEMS}]  ],
  color: '[{COLOR}]'
};

// EXISTING_CODE
// EXISTING_CODE
