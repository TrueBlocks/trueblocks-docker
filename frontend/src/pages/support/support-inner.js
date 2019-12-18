//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Support } from './support-getdata';

import Loading from '../../components/loading';
import PageHeader from '../../components/page-header';
import { SummaryTable } from '../../components/summary-table';

import { summary_support_data } from '../../fake_data/summary-data';
// EXISTING_CODE
//exiting1
// EXISTING_CODE

//----------------------------------------------------------------------
class SupportInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      which: 'support'
      // EXISTING_CODE
      //exiting2
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
          //exiting3
          // EXISTING_CODE
        });
      }
    }
    // EXISTING_CODE
    //existing4
    // EXISTING_CODE
  };

  getInner = () => {
    return (
      // EXISTING_CODE
      <Fragment>
        <ul>
          <li>Email support: &lt;support@trueblocks.io&gt;</li>
          <li>Online forums: &lt;https://discord.gg/zGh6PdN&gt;</li>
          <li>Free support during installation and setup</li>
        </ul>
        <h4>Per Incident</h4>
        <ul>
          <li>$95 US per hour until resolved</li>
          <li>Pay in Ether for a 10% discount</li>
        </ul>
        <h4>Support Plans</h4>
        <ul>
          <li>5 per-incident issue packs (10% discount)</li>
          <li>Annual subscription (20% discount)</li>
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
          <SummaryTable data={summary_support_data} active={this.state.which} no_labels innerEar={this.innerEar} />
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
            title="Support"
            notes="We provide various support options ranging from online email/forum discussions to 
            full enterprise-level support plans to suit your needs. We've got you covered."
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
const mapStateToProps = ({ reducer_Connection, reducer_Support }) => ({
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_Support
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupportInner);
