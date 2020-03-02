import * as mo from './actions';
import { queryAPI_get } from 'utils';

//----------------------------------------------------------------------
export const dispatcher_Monitors = (str) => {
  return (dispatch, getState) => {
    dispatch({
      type: mo.BEGIN
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
          type: mo.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const monitors_menu = {
  page: 'monitors',
  items: [
    { subpage: 'dashboard', route: 'dashboard', query: mo.DASHBOARD },
    { subpage: 'projects', route: 'status', query: mo.PROJECTS, icon: 'folder' },
    { subpage: 'addresses', route: 'status', query: mo.ADDRESSES, icon: 'widgets' },
    { subpage: 'daemon', route: 'names', query: mo.DAEMON, icon: 'event_note' },
    { subpage: 'scraper', route: 'status', query: mo.SCRAPER, icon: 'network_check' },
    { subpage: 'mo-0005' },
    { subpage: 'mo-0006' }
  ],
  expanded: false,
  color: 'pink'
};

// EXISTING_CODE
//----------------------------------------------------------------
export const dispatcher_RemoveMonitor = (address, remove) => {
  return (dispatch, getState) => {
    return queryAPI_get('rm', 'address=' + address + (remove ? '&yes' : ''))
      .then(async (res) => {
        return dispatch({
          type: mo.REMOVE
        });
      })
      .catch((err) => {
        dispatch({
          type: mo.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------
export const dispatcher_AddMonitor = (address) => {
  return (dispatch, getState) => {
    dispatch({
      type: mo.BEGIN
    });

    return queryAPI_get('list', 'addrs=' + address)
      .then(async (res) => {
        let json = await res.json();
        return dispatch({
          type: mo.CREATE,
          payload: json
        });
      })
      .catch((err) => {
        dispatch({
          type: mo.FAILURE,
          err
        });
      });
  };
};
// EXISTING_CODE
