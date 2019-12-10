import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reducer_Names } from './names-getdata';

import Loading from '../z_components/loading';
import PageNotes from '../z_components/page-notes';

const NamesInner = (props) => {
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
          <h4 className="inner-panel">Named Addresses</h4>
          <ul>
            <li>Named Address 1</li>
            <li>Named Address 2</li>
          </ul>
          <h4 className="inner-panel">Named Functions / Events</h4>
          <ul>
            <li>Named Function 1</li>
            <li>Named Event 2</li>
          </ul>
          <h4 className="inner-panel">Named Blocks</h4>
          <ul>
            <li>Named Block 1</li>
            <li>Named Block 2</li>
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
          Named Objects
          <PageNotes
            text="The Names component of TrueBlocks allows one to name various objects include any address (even if not previously monitored), 
          any Solidity function or event signatures, and other relevant data. These names may be shared anonomously with the TrueBlocks community."
          />
        </h1>
        {container}
      </div>
    </div>
  );
};

const mapStateToProps = ({ reducer_Connection, reducer_Names }) => ({
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      reducer_Names
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NamesInner);
