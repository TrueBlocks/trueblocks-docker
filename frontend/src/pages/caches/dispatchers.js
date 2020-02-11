import * as ca from './actions';
import { queryAPI_get } from 'utils';

//----------------------------------------------------------------------
export const dispatcher_Caches = (str) => {
  return (dispatch, getState) => {
    dispatch({
      type: ca.BEGIN
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
    { subpage: 'dashboard', route: 'dashboard', query: ca.DASHBOARD },
    { subpage: 'block cache', route: 'status', query: ca.BLOCK_CACHE },
    { subpage: 'tx cache', route: 'status', query: ca.TX_CACHE },
    { subpage: 'trace cache', route: 'status', query: ca.TRACE_CACHE },
    { subpage: 'slurps', route: 'status', query: ca.SLURPS },
    { subpage: 'prices', route: 'status', query: ca.PRICES },
    { subpage: 'abi cache', route: 'status', query: ca.ABI_CACHE }
  ],
  expanded: false,
  color: 'tan'
};

// EXISTING_CODE
// EXISTING_CODE
