import * as su from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Support = (action) => {
  return (dispatch, getState) => {
    dispatch({
      type: su.BEGIN
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
          type: su.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const support_menu = {
  page: 'support',
  items: [
    { subpage: 'free teir', route: 'support', query: su.FREE_TEIR },
    { subpage: 'pay teir', route: 'support', query: su.PAY_TEIR },
    { subpage: 'documentation', route: 'support', query: su.DOCUMENTATION },
    { subpage: 'connect us', route: 'support', query: su.CONNECT_US },
    { subpage: 'about', route: 'about', query: su.ABOUT },
    { subpage: 'su-0005' },
    { subpage: 'su-0006' }
  ],
  color: 'purple'
};

// EXISTING_CODE
// EXISTING_CODE