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
  } else if (props.systemData.caches === undefined) {
    status = 'initializing';
  } else {
    status = 'ready';
  }

  let container;
  switch (status) {
    case 'ready':
      container = (
        <div className="inner-panel">
          <h4 className="inner-panel">Names Group 1</h4>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
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

const mapStateToProps = ({ reducer_SystemStatus, reducer_Names }) => ({
  systemData: reducer_SystemStatus.systemData
  //  isLoading: reducer_SystemStatus.isLoading,
  //  error: reducer_SystemStatus.error
  // indexData: reducer_Names.indexData,
  // loadingIndex: reducer_Names.isLoading
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
