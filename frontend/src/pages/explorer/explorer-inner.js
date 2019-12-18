//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Explorer } from './explorer-getdata';

import Loading from '../../components/loading';
import PageHeader from '../../components/page-header';
import { SummaryTable } from '../../components/summary-table';

import { summary_explorer_data } from '../../fake_data/summary-data';
// EXISTING_CODE
import { polling } from '../../components/polling';
import { poll_timeout } from '../../config.js';
// EXISTING_CODE

//----------------------------------------------------------------------
class ExplorerInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      which: 'explorer'
      // EXISTING_CODE
      // EXISTING_CODE
    };
    this.innerEar = this.innerEar.bind(this);
  }

  innerEar = (cmd, value) => {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');
    if (cmd === 'change_page') {
      if (value === '/') {
        window.open('/', '_self');
      } else {
        this.setState({
          which: value
          // EXISTING_CODE
          // EXISTING_CODE
        });
      }
    }
    // EXISTING_CODE
    // EXISTING_CODE
  };

  getInner = () => {
    return (
      // EXISTING_CODE
      <Fragment>
        <ul>
          <li>Item 1 1</li>
          <li>Item 1 2</li>
        </ul>
        <h4>Explorer Group 2</h4>
        <ul>
          <li>Item 2 1</li>
          <li>Item 2 2</li>
        </ul>
      </Fragment>
      // EXISTING_CODE
    );
  };

  getContainer = () => {
    let container;
    if (this.props.error) {
      container = <Loading status="error" message={this.props.error} />;
    } else if (this.props.isConnected) {
      container = (
        <div className="inner-panel">
          <SummaryTable data={summary_explorer_data} active={this.state.which} no_labels innerEar={this.innerEar} />
          <h4>{this.state.which}</h4>
          {this.getInner()}
        </div>
      );
    } else {
      container = <Loading status="initializing" message="Initializing..." />;
    }
    return container;
  };

  render = () => {
    return (
      <div className="right-panel">
        <div>
          <PageHeader
            title="Explorer"
            notes="The Explorer allows one to view the details of every transactions for 
            each previously monitored address. Because TrueBlocks runs on a local machine not a server, this 
            means that you are restricted to exploring only addresses that you've previously monitored."
          />
          {this.getContainer()}
        </div>
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_Explorer }) => ({
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error,
  blocks: reducer_Explorer.blocks
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_Explorer
    },
    dispatch
  );

//----------------------------------------------------------------------
export default polling(dispatcher_Explorer, poll_timeout)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ExplorerInner)
);
