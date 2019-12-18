//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_[{PROPER}] } from './[{LONG}]-getdata';

import Loading from '../../components/loading';
import PageHeader from '../../components/page-header';
import { SummaryTable } from '../../components/summary-table';

import { summary_[{LONG}]_data } from '../../fake_data/summary-data';
// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class [{PROPER}]Inner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [{STATE_FIELDS}]
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
          [{STATE_FIELDS_2}]
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
          <SummaryTable data={summary_[{LONG}]_data} active={this.state.which} no_labels innerEar={this.innerEar} />
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
            title="[{PROPER}]"
            notes="[{PAGENOTES}]"
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
const mapStateToProps = ({ reducer_Connection, reducer_[{PROPER}] }) => ({
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error[{GLOBAL_STATE4}]
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_[{PROPER}]
    },
    dispatch
  );

//----------------------------------------------------------------------
[{CONNECT}]
