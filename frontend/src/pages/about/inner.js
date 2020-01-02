//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_About } from './dispatchers';

import { InnerPageHeader, LocalMenu } from '../../components';
import { teamText } from './text/team';
import * as ab from './actions';
import './about.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class AboutInner extends React.Component {
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
      this.props.dispatcher_About(value);
      return;
    }

    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
    if (this.state.subpage === ab.TEAM) {
      return teamText();
    }
    // EXISTING_CODE
    return (
      <Fragment>
        <h4>QuickBlocks {this.state.subpage}</h4>
        <div>
          The fastest, fully-decentralized way to access data from any Ethereum address or smart contract. Providing
          open source software libraries and tools for developers and accounting / auditing / monitoring solutions for
          the rest of us.
        </div>
        <h4>Design Philosophy</h4>
        <div>
          Local-first, 100% decentralized access to full detail Ethereum activity per account on consumer-grade
          hardware.
        </div>
        <h4>Team</h4>
        <div>Thomas Rush, Ed Mazurek, Joe G., Todd</div>
      </Fragment>
    );
    // EXISTING_CODE
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
      <div className="right-panel">
        <InnerPageHeader
          title="About"
          notes="Learn about the TrubBlocks project, our organization, our philosopy 
            towards decentralization, and our team."
        />
        {this.getInnerPage()}
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_About }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_Connection.isConnected,
  sysError: reducer_Connection.error,
  isLoading: reducer_About.isLoading,
  error: reducer_About.error,
  data: reducer_About.data,
  menu: reducer_About.menu
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_About
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutInner);