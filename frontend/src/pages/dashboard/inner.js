//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Dashboard } from './dispatchers';

import { DashMenu } from '../../components';
import * as utils from '../../utils';
import { dashboard_menu } from './';
import './dashboard.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class DashboardInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_submenu: props.cur_submenu
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  changePage = (dest) => {
    window.open(dest, '_self');
  };
  // EXISTING_CODE

  componentWillMount = () => {};

  componentDidMount = () => {
    this.innerEar('change_subpage', this.state.cur_submenu);
  };

  innerEar = (cmd, submenu) => {
    if (cmd === 'change_subpage') {
      // update the local state...
      this.setState({
        cur_submenu: submenu
      });
      // update the global state...
      this.props.dispatcher_Dashboard(submenu.route + '?' + submenu.query);
      return;
    }

    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
    // EXISTING_CODE
    return <Fragment></Fragment>;
    // EXISTING_CODE
  };

  getInnerPage = () => {
    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <Fragment>
        <DashMenu data={dashboard_menu} active={this.state.subpage} changePage={this.changePage} />
        {this.getInnerMost()}
      </Fragment>
    );
  };

  render = () => {
    return (
      <Fragment>
        <div className="inner-panel">
          <div className="title inner-page">{utils.breadCrumb('Dashboard', this.state.cur_submenu)}</div>
          {this.getInnerPage()}
        </div>
      </Fragment>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Status, reducer_Dashboard }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_Status.isConnected,
  sysError: reducer_Status.error,
  isLoading: reducer_Dashboard.isLoading,
  error: reducer_Dashboard.error,
  data: reducer_Dashboard.data,
  meta: reducer_Dashboard.meta
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_Dashboard
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardInner);