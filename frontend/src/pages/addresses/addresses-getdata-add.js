import React from 'react';
const Utils = require('../../utils');

//----------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
const BEGIN = 'monitAdd/BEGIN';
const SUCCESS = 'monitAdd/SUCCESS';
const FAILURE = 'monitAdd/FAILURE';

//----------------------------------------------------------------
export default function reducer_AddressAdd(state = initialState, action) {
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: 'Could not add monitor'
      };

    default:
      return state;
  }
}

//----------------------------------------------------------------
export const dispatcher_AddressAdd = (address) => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return Utils.queryAPI_get('list', 'verbose=10&addrs=' + address)
      .then(async (res) => {
        let json = await res.json();
        return dispatch({
          type: SUCCESS,
          payload: json
        });
      })
      .catch((e) => {
        dispatch({
          type: FAILURE
        });
      });
  };
};

//---------------------------------------------------------------------
export const AddNewAddress = (props) => {
  let inputAddress;

  const onSubmit = (el) => {
    el.preventDefault();
    props.addMonitor(inputAddress.value);
  };

  return (
    <div className="address-add">
      <form onSubmit={onSubmit}>
        <input placeholder="0x0000...0000" ref={(user_input) => (inputAddress = user_input)}></input>
        <button>Add Monitor</button>
      </form>
    </div>
  );
};
