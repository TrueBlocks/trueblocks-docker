import * as na from './actions';
import { queryAPI_get } from 'utils';

//----------------------------------------------------------------------
export const dispatcher_Names = (str) => {
  return (dispatch, getState) => {
    dispatch({
      type: na.BEGIN
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
          type: na.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const names_menu = {
  page: 'names',
  items: [
    { subpage: 'dashboard', route: 'dashboard', query: na.DASHBOARD },
    { subpage: 'your names', route: 'names', query: na.YOUR_NAMES },
    { subpage: 'wallets', route: 'names', query: na.WALLETS },
    { subpage: 'tokens', route: 'names', query: na.TOKENS },
    { subpage: 'prefunds', route: 'names', query: na.PREFUNDS },
    { subpage: 'other names', route: 'names', query: na.OTHER_NAMES },
    { subpage: 'groups', route: 'names', query: na.GROUPS },
    { subpage: 'separator' },
    { subpage: 'downloaded', route: 'abi', query: na.DOWNLOADED },
    { subpage: 'common', route: 'abi', query: na.COMMON },
    { subpage: 'names', route: 'abi', query: na.NAMES },
    { subpage: 'params', route: 'abi', query: na.PARAMS },
    { subpage: 'cross', route: 'abi', query: na.CROSS },
    { subpage: 'separator' },
    { subpage: 'your blocks', route: 'when', query: na.YOUR_BLOCKS },
    { subpage: 'known blocks', route: 'when', query: na.KNOWN_BLOCKS },
    { subpage: 'dated blocks', route: 'when', query: na.DATED_BLOCKS }
  ],
  expanded: false,
  color: 'pink'
};

// EXISTING_CODE
// EXISTING_CODE
