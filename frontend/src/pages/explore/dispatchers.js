import * as ex from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Explore = (route, query) => {
  return (dispatch, getState) => {
    dispatch({
      type: ex.BEGIN
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
          type: ex.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const explore_menu = {
  page: 'explore',
  items: [
    { subpage: 'accounts', route: 'status', query: ex.ACCOUNTS },
    { subpage: 'blocks', route: 'blocks', query: ex.BLOCKS },
    { subpage: 'transactions', route: 'transactions', query: ex.TRANSACTIONS },
    { subpage: 'receipts', route: 'receipts', query: ex.RECEIPTS },
    { subpage: 'logs', route: 'logs', query: ex.LOGS },
    { subpage: 'traces', route: 'traces', query: ex.TRACES },
    { subpage: 'ex-0006' }
  ],
  color: 'purple'
};

// EXISTING_CODE
// EXISTING_CODE