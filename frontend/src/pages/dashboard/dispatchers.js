import * as da from './actions';
import { queryAPI_get } from 'utils';

//----------------------------------------------------------------------
export const dispatcher_Dashboard = (str) => {
  return (dispatch, getState) => {
    dispatch({
      type: da.BEGIN
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
  expanded: false,
  color: 'white'
};

// EXISTING_CODE
// EXISTING_CODE
