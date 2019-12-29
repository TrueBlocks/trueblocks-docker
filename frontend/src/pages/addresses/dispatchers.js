import React from 'react';
import * as ad from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Addresses = (cmd, options) => {
  return (dispatch, getState) => {
    dispatch({
      type: ad.BEGIN
    });

    return Utils.queryAPI_get(cmd, options)
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: ad.SUCCESS,
            payload: json.data[0].caches[0].items
          });
          return json.data[0].caches[0].items;
        }
      })
      .catch((err) => {
        dispatch({
          type: ad.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------
export const dispatcher_RemoveMonitor = (address, remove) => {
  return (dispatch, getState) => {
    dispatch({
      type: ad.BEGIN
    });

    return Utils.queryAPI_get('rm', 'address=' + address + (remove ? '&yes' : ''))
      .then(async (res) => {
        console.log(res);
        console.log(res.json());
        let json = await res.json();
        return dispatch({
          type: ad.REMOVE,
          payload: json
        });
      })
      .catch((err) => {
        dispatch({
          type: ad.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------
export const dispatcher_AddMonitor = (address) => {
  return (dispatch, getState) => {
    dispatch({
      type: ad.BEGIN
    });

    return Utils.queryAPI_get('list', 'verbose=10&addrs=' + address)
      .then(async (res) => {
        let json = await res.json();
        return dispatch({
          type: ad.ADD,
          payload: json
        });
      })
      .catch((err) => {
        dispatch({
          type: ad.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const dispatcher_Names = (cmd, options) => {
  return (dispatch, getState) => {
    dispatch({
      type: ad.BEGIN
    });

    console.log(cmd, options);
    return Utils.queryAPI_get(cmd, options)
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: ad.SUCCESS,
            payload: json.data
          });
          return json.data
        }
      })
      .catch((err) => {
        dispatch({
          type: ad.FAILURE,
          err
        });
      });
  };
};
