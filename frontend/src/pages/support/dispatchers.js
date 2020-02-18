import * as su from './actions';
import { queryAPI_get } from 'utils';

//----------------------------------------------------------------------
export const dispatcher_Support = (str) => {
  return (dispatch, getState) => {
    dispatch({
      type: su.BEGIN
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
    { subpage: 'dashboard', route: 'dashboard', query: su.DASHBOARD, icon: 'contact_support' },
    { subpage: 'free support', route: '', query: su.FREE_SUPPORT, icon: 'money_off' },
    { subpage: 'per incident', route: '', query: su.PER_INCIDENT, icon: 'attach_money' },
    { subpage: 'documentation', route: '', query: su.DOCUMENTATION, icon: 'help' },
    { subpage: 'contact us', route: '', query: su.CONTACT_US, icon: 'contact_mail' },
    { subpage: 'about us', route: '', query: su.ABOUT_US, icon: 'people' },
    { subpage: 'su-0006' }
  ],
  expanded: false,
  color: 'purple'
};

// EXISTING_CODE
// EXISTING_CODE
