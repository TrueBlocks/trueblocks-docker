//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Signatures } from './signatures-getdata';

import Loading from '../../components/loading';
import PageHeader from '../../components/page-header';
import { SummaryTable } from '../../components/summary-table';

import { summary_signatures_data } from '../../fake_data/summary-data';
// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class SignaturesInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      which: 'signatures/monitors'
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
          <SummaryTable data={summary_signatures_data} active={this.state.which} no_labels innerEar={this.innerEar} />
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
            title="Signatures"
            notes="TrueBlocks Signatures greatly speed up access to the Ethereum data; however, they take up a lot of space on your 
            hard drive, so you have to keep any eye on them. Clean them out periodically so they don't get too big."
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
const mapStateToProps = ({ reducer_Connection, reducer_Signatures }) => ({
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_Signatures
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignaturesInner);
