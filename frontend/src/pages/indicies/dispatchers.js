import * as ind from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Indicies = (route, query) => {
  return (dispatch, getState) => {
    dispatch({
      type: ind.BEGIN
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
    { subpage: 'finalized', route: 'status', query: ind.FINALIZED },
    { subpage: 'staged', route: 'status', query: ind.STAGED },
    { subpage: 'unripe', route: 'status', query: ind.UNRIPE },
    { subpage: 'columns', route: 'status', query: ind.COLUMNS },
    { subpage: 'shared', route: 'status', query: ind.SHARED },
    { subpage: 'ind-0005' },
    { subpage: 'ind-0006' }
  ],
  color: 'blue'
};

// EXISTING_CODE
// EXISTING_CODE