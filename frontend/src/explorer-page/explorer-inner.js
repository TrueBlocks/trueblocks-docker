import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Explorer_reducer } from './explorer-getdata';

import Loading from '../z_components/loading';
import PageNotes from '../z_components/page-notes';

const ExplorerInner = (props) => {
  let status;
  if (props.isLoading) {
    status = 'loading';
  }

  if (props.error) {
    status = 'error';
  } else if (props.systemData.caches === undefined && props.chainStatus.finalized === undefined) {
    status = 'initializing';
  } else {
    status = 'ready';
  }

  let container;
  switch (status) {
    case 'ready':
      container = (
        <div className="inner-panel">
          <h4 className="inner-panel">Explorer Group 1</h4>
          <ul>
            <li>Item 1 1</li>
            <li>Item 1 2</li>
          </ul>
          <h4 className="inner-panel">Explorer Group 2</h4>
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
        <h1>
          Address Explorer
          <PageNotes
            text="The Address Explorer allows one to view the details of every transactions for each previously monitored address. Because 
            TrueBlocks runs on a local machine not a server, this means that you are restricted to exploring only addresses that you've previously monitored."
          />
        </h1>
        {container}
      </div>
    </div>
  );
};

const mapStateToProps = ({ reducer_SystemStatus, Explorer_reducer }) => ({
  systemData: reducer_SystemStatus.systemData,
  chainStatus: reducer_SystemStatus.chainStatus,
  isLoading: reducer_SystemStatus.isLoading,
  error: reducer_SystemStatus.error
  // indexData: Explorer_reducer.indexData,
  // loadingIndex: Explorer_reducer.isLoading
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      Explorer_reducer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExplorerInner);
