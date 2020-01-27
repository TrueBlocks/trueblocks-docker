import * as su from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Support = (str) => {
  return (dispatch, getState) => {
    dispatch({
      type: su.BEGIN
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
    { subpage: 'dashboard', route: 'dashboard', query: su.DASHBOARD },
    { subpage: 'free support', route: '', query: su.FREE_SUPPORT },
    { subpage: 'per incident', route: '', query: su.PER_INCIDENT },
    { subpage: 'documentation', route: '', query: su.DOCUMENTATION },
    { subpage: 'contact us', route: '', query: su.CONTACT_US },
    { subpage: 'about us', route: '', query: su.ABOUT_US },
    { subpage: 'su-0006' }
  ],
  expanded: false,
  color: 'purple'
};

// EXISTING_CODE
// EXISTING_CODE
