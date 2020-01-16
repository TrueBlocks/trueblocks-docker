import * as da from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Dashboard = (route, query) => {
  return (dispatch, getState) => {
    dispatch({
      type: da.BEGIN
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
          type: da.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const dashboard_menu = {
  page: 'dashboard',
  items: [],
  color: 'white'
};

// EXISTING_CODE
// EXISTING_CODE