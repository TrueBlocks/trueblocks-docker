import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Explorer } from './explorer-getdata';
import { polling } from '../z_components/polling';

import Loading from '../z_components/loading';
import InnerHeader from '../z_components/inner-header';
import { poll_timeout } from '../config.js';

const ExplorerInner = (props) => {
  let status;
  if (props.isLoading) {
    status = 'loading';
  }

  if (props.error) {
    status = 'error';
  } else if (!props.isConnected) {
    status = 'initializing';
  } else {
    status = 'ready';
  }

  let container;
  switch (status) {
    case 'ready':
      container = (
        <div className="inner-panel">
          <h4>Explorer Group 1</h4>
          <ul>
            <li>Item 1 1</li>
            <li>Item 1 2</li>
          </ul>
          <h4>Explorer Group 2</h4>
          <ul>
            <li>Item 2 1</li>
            <li>Item 2 2</li>
          </ul>
        </div>
      );
      break;
    case 'initializing':
      container = <Loading status={status} message="Initializing..." />;
      break;
    case 'error':
      container = <Loading status={status} message={props.error} />;
      break;
    default:
      container = <Loading status={status} message="Loading..." />;
  }
  return (
    <div className="right-panel">
      <div>
        <InnerHeader
          title="Address Explorer"
          notes="The Address Explorer allows one to view the details of every transactions for
          each previously monitored address. Because TrueBlocks runs on a local machine not a server, this means that you are
          restricted to exploring only addresses that you've previously monitored."
        />
        {container}
      </div>
    </div>
  );
};

const mapStateToProps = ({ reducer_Connection, reducer_Explorer }) => ({
  blocks: reducer_Explorer.blocks,
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_Explorer
    },
    dispatch
  );

export default polling(dispatcher_Explorer, poll_timeout)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ExplorerInner)
);
