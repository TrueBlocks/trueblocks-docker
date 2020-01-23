//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Dashboard } from './dispatchers';

import { DashMenu } from '../../components';
import { BreadCrumb } from '../../components'
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
    // EXISTING_CODE
    // EXISTING_CODE
  }

  componentDidMount = () => {
    this.props.dispatcher_Dashboard(this.state.cur_submenu.route + '?' + this.state.cur_submenu.query);
  };

  // EXISTING_CODE
  changePage = (dest) => {
    window.open(dest, '_self');
  };
  // EXISTING_CODE

  getInnerPage = () => {
    // EXISTING_CODE
    return <DashMenu data={dashboard_menu} active={this.state.subpage} changePage={this.changePage} />;
    // EXISTING_CODE
  };

  render = () => {
    return (
        <div className="inner-panel">
          <BreadCrumb page='Dashboard' menu={this.state.cur_submenu} />
          {this.getInnerPage()}
          {JSON.stringify(this.state)}
        </div>
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