import * as di from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Digests = (str) => {
  return (dispatch, getState) => {
    dispatch({
      type: di.BEGIN
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
          type: di.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const digests_menu = {
  page: 'digests',
  items: [
    { subpage: 'dashboard', route: 'dashboard', query: di.DASHBOARD },
    { subpage: 'finalized', route: 'status', query: di.FINALIZED },
    { subpage: 'staged', route: 'status', query: di.STAGED },
    { subpage: 'unripe', route: 'status', query: di.UNRIPE },
    { subpage: 'columns', route: 'status', query: di.COLUMNS },
    { subpage: 'shared', route: 'status', query: di.SHARED },
    { subpage: 'di-0006' }
  ],
  expanded: false,
  color: 'blue'
};

// EXISTING_CODE
// EXISTING_CODE
