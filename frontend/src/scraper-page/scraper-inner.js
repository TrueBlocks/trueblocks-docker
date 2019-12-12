import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scraper_reducer } from './scraper-getdata';

import Loading from '../z_components/loading';
import InnerHeader from '../z_components/inner-header';

const ScraperInner = (props) => {
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
          <h4 className="inner-panel">Scraper Group 1</h4>
          <ul>
            <li>Item 1 1</li>
            <li>Item 1 2</li>
          </ul>
          <h4 className="inner-panel">Scraper Group 2</h4>
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
        <InnerHeader title='Address Scraper' notes="The Address Scraper scans mainnet from its origin, visiting each block. Within
          each block, it visits each transaction and within each transaction, it visits each receipt, each log, and each trace
          extracting &lt;address appearances&gt; and building the Address Index."
        />
        {container}
      </div>
    </div>
  );
};

const mapStateToProps = ({ reducer_Connection, Scraper_reducer }) => ({
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      Scraper_reducer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScraperInner);
