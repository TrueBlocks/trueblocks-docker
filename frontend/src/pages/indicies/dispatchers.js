import * as ind from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Indicies = (str) => {
  return (dispatch, getState) => {
    dispatch({
      type: ind.BEGIN
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
          type: ind.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const indicies_menu = {
  page: 'indicies',
  items: [
    { subpage: 'dashboard', route: 'dashboard', query: ind.DASHBOARD },
    { subpage: 'finalized', route: 'status', query: ind.FINALIZED },
    { subpage: 'staged', route: 'status', query: ind.STAGED },
    { subpage: 'unripe', route: 'status', query: ind.UNRIPE },
    { subpage: 'columns', route: 'status', query: ind.COLUMNS },
    { subpage: 'shared', route: 'status', query: ind.SHARED },
    { subpage: 'ind-0006' }
  ],
  expanded: false,
  color: 'blue'
};

// EXISTING_CODE
// EXISTING_CODE
