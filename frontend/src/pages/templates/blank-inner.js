//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_[{PROPER}] } from './[{LONG}]-getdata';

import Loading from '../../components/loading';
import PageHeader from '../../components/page-header';
import { [{MENU_TYPE}] } from '../../components/[{MENU_FILE}]';
import { [{LONG}]_local_menu } from '../../fake_data/summary-data';
import './[{LONG}].css';[{POLLING}]

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class [{PROPER}]Inner extends React.Component {
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
    return (
      // EXISTING_CODE
      // EXISTING_CODE
    );
  };

  getContainer = () => {
    var isConnected = this.props.isConnected;
    // EXISTING_CODE
    // EXISTING_CODE
    let container;
    if (this.props.error) {
      container = <Loading status="error" message={this.props.error} />;
    } else if (isConnected) {
      container = (
        <div className="inner-panel">
          <[{MENU_TYPE}] data={[{LONG}]_local_menu} active={this.state.subpage} innerEar={this.innerEar} />
          {this.getInner()}
        </div>
      );
    } else {
      container = <Loading status="initializing" message="Loading..." />;
    }
    return container;
  };

  render = () => {
    return (
      <div className="right-panel">
        <PageHeader
          title="[{PROPER}]"
          notes="[{PAGENOTES}]"
        />
        {this.getContainer()}
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_[{PROPER}] }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error[{GLOBAL_STATE4}]
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_[{PROPER}]
    },
    dispatch
  );

//----------------------------------------------------------------------
[{CONNECT}]
