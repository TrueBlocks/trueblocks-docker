import * as [{TWO}] from './actions';
import { queryAPI_get } from 'utils';

//----------------------------------------------------------------------
export const dispatcher_[{PROPER}] = (str) => {
  return (dispatch, getState) => {
    dispatch({
      type: [{TWO}].BEGIN
    });

    var array = str.split('?');
    return queryAPI_get(array[0], array[1])
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
          type: [{TWO}].FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const [{LOWER}]_menu = {
  page: '[{LOWER}]',
  items: [[{MENU_ITEMS}]  ],
  expanded: false,
  color: '[{COLOR}]'
};

// EXISTING_CODE
// EXISTING_CODE
