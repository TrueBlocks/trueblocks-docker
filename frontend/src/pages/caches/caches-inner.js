//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Caches } from './caches-getdata';

import Loading from '../../components/loading';
import PageHeader from '../../components/page-header';
import { LocalMenu } from '../../components/local-menu';
import './caches.css';

// EXISTING_CODE
import { DetailTable } from '../../components/detail-table';
import { summary_caches_data } from '../../fake_data/summary-data';
import { txs } from '../../fake_data/detail-data-txs.js';
import DetailPopup from '../../components/detail-popup';
// EXISTING_CODE

//----------------------------------------------------------------------
class CachesInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // EXISTING_CODE
      showPopup: false,
      current: '',
      data: txs,
      // EXISTING_CODE
      subpage: 'caches/txs'
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  closePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  // EXISTING_CODE

  innerEar = (cmd, value) => {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');

    // EXISTING_CODE
    // EXISTING_CODE

    if (cmd === 'change_subpage') {
      this.setState({
        // EXISTING_CODE
        data: txs,
        showPopup: false,
        current: {},
        // EXISTING_CODE
        subpage: value
      });
    } else if (cmd === 'goto_page') {
      window.open('/' + value.replace('/', '?sub='), '_self');
    }
    // EXISTING_CODE
    if (cmd === 'expand') {
      if (value === this.state.current) {
        this.setState({
          data: txs,
          showPopup: false,
          current: {},
          subpage: value
        });
      } else {
        this.setState({
          data: txs,
          showPopup: true,
          current: value,
          subpage: value
        });
      }
    }
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInner = () => {
    if (this.state.showPopup) {
      return (
        <Fragment>
          <DetailTable css_pre="caches" data={this.state.data} innerEar={this.innerEar} />
          <DetailPopup closePopup={this.closePopup.bind(this)} item={this.state.current} ear={this.innerEar} />
        </Fragment>
      );
    }

    return (
      // EXISTING_CODE
      <Fragment>
        <DetailTable css_pre="caches" data={this.state.data} innerEar={this.innerEar} />
      </Fragment>
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
          <LocalMenu data={summary_caches_data} active={this.state.subpage} innerEar={this.innerEar} />
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
          title="Caches"
          notes="TrueBlocks Caches greatly speed up access to the Ethereum data; however, they take up a lot of space on your 
            hard drive, so you have to keep any eye on them. Clean them out periodically so they don't get too big."
        />
        {this.getContainer()}
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_Caches }) => ({
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
      dispatcher_Caches
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CachesInner);
