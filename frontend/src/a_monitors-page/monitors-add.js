import React from 'react';
import queryAPI from '../z_utils/queryAPI';

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
export default function reducer_MonitorAdd(state = initialState, action) {
  //console.log('monitAdd', action, state);
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
const getMonitorData = (endpoint, address) => {
  return fetch(`${endpoint}/list?addrs=${address}`);
};

//----------------------------------------------------------------
export const dispatcher_MonitorAdd = (address) => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'list', 'addrs=' + address)
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
export const AddNewMonitor = (props) => {
  let inputAddress;

  const onSubmit = (el) => {
    el.preventDefault();
    props.addMonitor(inputAddress.value);
  };

  return (
    <div className="monitor-add">
      <form onSubmit={onSubmit}>
        <input placeholder="0x0000...0000" ref={(user_input) => (inputAddress = user_input)}></input>
        <button>Add Monitor</button>
      </form>
    </div>
  );
};
