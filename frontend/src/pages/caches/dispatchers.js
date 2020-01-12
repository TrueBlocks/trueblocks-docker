import * as ca from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Caches = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: ca.BEGIN
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
          type: ca.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const caches_menu = {
  page: 'caches',
  items: [
    { subpage: 'overview', route: 'status', query: ca.OVERVIEW },
    { subpage: 'block cache', route: 'status', query: ca.BLOCK_CACHE },
    { subpage: 'tx cache', route: 'status', query: ca.TX_CACHE },
    { subpage: 'trace cache', route: 'status', query: ca.TRACE_CACHE },
    { subpage: 'slurps', route: 'status', query: ca.SLURPS },
    { subpage: 'abi cache', route: 'status', query: ca.ABI_CACHE },
    { subpage: 'ca-0006' }
  ],
  color: 'tan'
};

// EXISTING_CODE
// EXISTING_CODE