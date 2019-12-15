import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Index_reducer } from './index-getdata';

import Loading from '../z_components/loading';
import InnerHeader from '../z_components/inner-header';

const IndexInner = (props) => {
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
          <h4>Index Group 1</h4>
          <ul>
            <li>Item 1 1</li>
            <li>Item 1 2</li>
          </ul>
          <h4>Index Group 2</h4>
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
          title="Indexes"
          notes="TrueBlocks Indexes greatly speed up access to the Ethereum data; however, they take up a lot of space on your 
          hard drive, so you have to keep any eye on them. Clean them out periodically so they don't get too big."
        />
        {container}
      </div>
    </div>
  );
};

const mapStateToProps = ({ reducer_Connection, Index_reducer }) => ({
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      Index_reducer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexInner);
