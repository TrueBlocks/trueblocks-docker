//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Dashboard } from './dispatchers';

import { InnerPageHeader, DetailTable, SummaryTable, isReady, NotReady } from '../../components';
import { dashboard_local_menu } from '../../fake_data/summary-data';
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
  // EXISTING_CODE

  componentWillMount = () => {};

  componentDidMount = () => {
    this.innerEar('change_subpage', this.props.subpage);
  };

  innerEar = (cmd, value) => {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');
    if (cmd === 'change_subpage') {
      // update the local state...
      this.setState({
        subpage: value
      });
      // update the global state...
      // var query = 'modes=dashboard&types=' + value.replace('dashboard/', '');
      // this.props.dispatcher_Dashboard(query);
    }
    // EXISTING_CODE
    if (cmd === 'goto_page') {
      window.open('/' + value, '_self');
    }
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
    // EXISTING_CODE
    return <Fragment></Fragment>;
    // EXISTING_CODE
    // return <DetailTable css_pre="dashboard" data={this.props.data} innerEar={this.innerEar} />;
  };

  getInnerPage = () => {
    if (!isReady(this.props, this.props)) return <NotReady {...this.props} />;

    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <Fragment>
        <SummaryTable data={dashboard_local_menu} active={this.state.subpage} innerEar={this.innerEar} />
        {this.getInnerMost()}
      </Fragment>
    );
  };

  render = () => {
    return (
      <div className="right-panel">
        <InnerPageHeader
          title="Dashboard"
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
const mapStateToProps = ({ reducer_Connection, reducer_Dashboard }) => ({
  sysConnected: reducer_Connection.isConnected,
  sysError: reducer_Connection.error,
  isLoading: reducer_Dashboard.isLoading,
  error: reducer_Dashboard.error,
  data: reducer_Dashboard.data
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_Dashboard
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardInner);
