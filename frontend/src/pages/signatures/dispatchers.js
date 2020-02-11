import * as si from './actions';
import { queryAPI_get } from 'utils';

//----------------------------------------------------------------------
export const dispatcher_Signatures = (str) => {
  return (dispatch, getState) => {
    dispatch({
      type: si.BEGIN
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
          type: si.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const signatures_menu = {
  page: 'signatures',
  items: [
    { subpage: 'dashboard', route: 'dashboard', query: si.DASHBOARD },
    { subpage: 'downloaded', route: 'abi', query: si.DOWNLOADED },
    { subpage: 'common', route: 'abi', query: si.COMMON },
    { subpage: 'generated', route: 'signatures', query: si.GENERATED },
    { subpage: 'si-0004' },
    { subpage: 'si-0005' },
    { subpage: 'si-0006' }
  ],
  expanded: false,
  color: 'green'
};

// EXISTING_CODE
// EXISTING_CODE
