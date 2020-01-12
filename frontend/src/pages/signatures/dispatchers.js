import * as si from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Signatures = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: si.BEGIN
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
    { subpage: 'downloaded', route: 'abi', query: si.DOWNLOADED },
    { subpage: 'common', route: 'abi', query: si.COMMON },
    { subpage: 'generated', route: 'signatures', query: si.GENERATED },
    { subpage: 'si-0003' },
    { subpage: 'si-0004' },
    { subpage: 'si-0005' },
    { subpage: 'si-0006' }
  ],
  color: 'green'
};

// EXISTING_CODE
// EXISTING_CODE