import * as ot from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Other = (str) => {
  return (dispatch, getState) => {
    dispatch({
      type: ot.BEGIN
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
          type: ot.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const other_menu = {
  page: 'other',
  items: [
    { subpage: 'dashboard', route: 'dashboard', query: ot.DASHBOARD },
    { subpage: 'custom', route: 'when', query: ot.CUSTOM },
    { subpage: 'known', route: 'when', query: ot.KNOWN },
    { subpage: 'generated', route: 'other', query: ot.GENERATED },
    { subpage: 'prices', route: 'quotes', query: ot.PRICES },
    { subpage: 'groups', route: 'names', query: ot.GROUPS },
    { subpage: 'ot-0006' }
  ],
  expanded: false,
  color: 'orange'
};

// EXISTING_CODE
// EXISTING_CODE
