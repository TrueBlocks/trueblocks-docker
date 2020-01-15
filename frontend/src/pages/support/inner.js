//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Support } from './dispatchers';

import { LocalMenu } from '../../components';
import { documentationText } from './text/documentation';
import * as su from './actions';
import './support.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class SupportInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subpage: props.subpage
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  // EXISTING_CODE

  componentWillMount = () => {};

  componentDidMount = () => {
    this.innerEar('change_subpage', this.props.subpage);
  };

  innerEar = (cmd, value) => {
    if (cmd === 'change_subpage') {
      // update the local state...
      this.setState({
        subpage: value
      });
      // update the global state...
      this.props.dispatcher_Support(value);
      return;
    }

    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
    if (this.state.subpage === su.DOCUMENTATION) {
      return documentationText();
    }
    // EXISTING_CODE
    //return (
    //  <Fragment>
    //    {this.state.subpage}
    //    <ul>
    //      <li>Email support: &lt;support@trueblocks.io&gt;</li>
    //      <li>Online forums: &lt;https://discord.gg/zGh6PdN&gt;</li>
    //      <li>Free support during installation and setup</li>
    //    </ul>
    //    <h4>Per Incident</h4>
    //    <ul>
    //      <li>$95 US per hour until resolved</li>
    //      <li>Pay in Ether for a 10% discount</li>
    //    </ul>
    //    <h4>Support Plans</h4>
    //    <ul>
    //      <li>5 per-incident issue packs (10% discount)</li>
    //      <li>Annual subscription (20% discount)</li>
    //    </ul>
    //  </Fragment>
    //);
    // EXISTING_CODE
    return <div style={{ width: '98%' }}>Content of Support page with subpage: {this.state.subpage}</div>;
  };

  getInnerPage = () => {
    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <Fragment>
        <LocalMenu data={this.props.menu} active={this.state.subpage} innerEar={this.innerEar} />
        {this.getInnerMost()}
      </Fragment>
    );
  };

  render = () => {
    return (
      <Fragment>
        <div className="inner-panel">
          <div className="title inner-page">Support</div>
          {this.getInnerPage()}
        </div>
      </Fragment>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Status, reducer_Support }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_Status.isConnected,
  sysError: reducer_Status.error,
  isLoading: reducer_Support.isLoading,
  error: reducer_Support.error,
  data: reducer_Support.data,
  meta: reducer_Support.meta,
  fieldList: reducer_Support.fieldList,
  menu: reducer_Support.menu
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