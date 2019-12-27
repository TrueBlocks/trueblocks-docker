//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Support } from './support-getdata';

import { InnerPageHeader } from '../../components';
import { LocalMenu } from '../../components/local-menu';
import { Loading } from '../../components/loading';
import { support_local_menu } from '../../fake_data/summary-data';
import './support.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class SupportInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // EXISTING_CODE
      // EXISTING_CODE
      subpage: props.subpage
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  // EXISTING_CODE

  innerEar = (cmd, value) => {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');

    // EXISTING_CODE
    // EXISTING_CODE

    if (cmd === 'change_subpage') {
      this.setState({
        // EXISTING_CODE
        // EXISTING_CODE
        subpage: value
      });
    } else if (cmd === 'goto_page') {
      window.open('/' + value, '_self');
    }
    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInner = () => {
    let inner;
    // EXISTING_CODE
    inner = (
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
    );
    // EXISTING_CODE
    return inner;
  };

  getContainer = () => {
    // EXISTING_CODE
    // EXISTING_CODE
    let container;
    if (this.props.error) {
      container = <Loading source="support" status="error" message={this.props.error} />;
    } else if (this.props.isConnected) {
      container = (
        <div className="inner-panel">
          <LocalMenu data={support_local_menu} active={this.state.subpage} innerEar={this.innerEar} />
          {this.getInner()}
        </div>
      );
    } else {
      container = <Loading source="support" status="initializing" message="Loading..." />;
    }
    return container;
  };

  render = () => {
    return (
      <div className="right-panel">
        <InnerPageHeader
          title="Support"
          notes="We provide various support options ranging from online email/forum discussions to 
            full enterprise-level support plans to suit your needs. We've got you covered."
        />
        {this.getContainer()}
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_Support }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_Support
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupportInner);
