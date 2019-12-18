//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Other } from './other-getdata';

import Loading from '../../components/loading';
import PageHeader from '../../components/page-header';
import { SummaryTable } from '../../components/summary-table';

import { summary_other_data } from '../../fake_data/summary-data';
// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class OtherInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      which: 'other/custom'
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
      <ul>
        <li>Item 1 1</li>
        <li>Item 1 2</li>
        <li>Item 1 2</li>
        <li>Item 1 2</li>
      </ul>
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
          <SummaryTable data={summary_other_data} active={this.state.which} no_labels innerEar={this.innerEar} />
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
            title="Other"
            notes="The Other panel allows you to configure various other items related to TrueBlocks."
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
const mapStateToProps = ({ reducer_Connection, reducer_Other }) => ({
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_Other
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherInner);
