//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Dashboard } from './dispatchers';

import { DashMenu } from '../../components';
import './dashboard.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class DashboardInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subpage: props.subpage
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  changePage = (page, action) => {
    var res = action.split('/');
    var dest = page + '/subpage=' + res[0] + '-' + res[1];
    window.open('/' + dest, '_self');
  };
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
      this.props.dispatcher_Dashboard(value);
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
    return <div style={{ width: '98%' }}>Content of Dashboard page with subpage: {this.state.subpage}</div>;
  };

  getInnerPage = () => {
    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <Fragment>
        <DashMenu data={this.props.menu} active={this.state.subpage} changePage={this.changePage} />
        {this.getInnerMost()}
      </Fragment>
    );
  };

  render = () => {
    return (
      <Fragment>
        <div className="inner-panel">
          <div className="title inner-page">Dashboard</div>
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
  meta: reducer_Dashboard.meta,
  fieldList: reducer_Dashboard.fieldList,
  menu: reducer_Dashboard.menu
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