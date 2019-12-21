//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Caches } from './caches-getdata';

import Loading from '../../components/loading';
import PageHeader from '../../components/page-header';
import { LocalMenu } from '../../components/local-menu';
import { caches_local_menu } from '../../fake_data/summary-data';
import { overview } from '../../fake_data/caches-overview';
import { blocks } from '../../fake_data/caches-blocks';
import { transactions } from '../../fake_data/caches-transactions';
import { traces } from '../../fake_data/caches-traces';
import { prices } from '../../fake_data/caches-prices';
import './caches.css';

// EXISTING_CODE
import DetailPopup from '../../components/detail-popup';
import { DetailTable } from '../../components/detail-table';
import '../../components/detail-table.css';
// EXISTING_CODE

//----------------------------------------------------------------------
class CachesInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // EXISTING_CODE
      showPopup: false,
      // EXISTING_CODE
      subpage: props.subpage
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  closePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  componentDidMount = () => {
    // this.props.monitorDispatch();
  };
  // EXISTING_CODE

  innerEar = (cmd, value) => {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');

    // EXISTING_CODE
    // EXISTING_CODE

    if (cmd === 'change_subpage') {
      var newData;
      switch (value) {
        case 'caches/blocks':
          newData = blocks;
          break;
        case 'caches/transactions':
          newData = transactions;
          break;
        case 'caches/traces':
          newData = traces;
          break;
        case 'caches/prices':
          newData = prices;
          break;
        default:
          newData = overview;
          break;
      }

      this.setState({
        // EXISTING_CODE
        showPopup: false,
        // EXISTING_CODE
        subpage: value,
        theData: newData,
        selectedRow: {}
      });
    } else if (cmd === 'goto_page') {
      window.open('/' + value, '_self');
    }
    // EXISTING_CODE
    if (cmd === 'remove') {
      //this.props.removeDispatch(value, true);
    } else if (cmd === 'delete' || cmd === 'undo') {
      //this.props.removeDispatch(value, false);
    } else if (cmd === 'expand') {
      if (value === this.state.selectedRow) {
        this.setState({
          showPopup: false,
          selectedRow: {}
        });
      } else {
        this.setState({
          showPopup: true,
          selectedRow: value
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
          <DetailTable css_pre="caches" data={this.state.theData} innerEar={this.innerEar} />
          <DetailPopup closePopup={this.closePopup.bind(this)} item={this.state.selectedRow} ear={this.innerEar} />
        </Fragment>
      );
    }

    return (
      // EXISTING_CODE
      <Fragment>
        <DetailTable css_pre="caches" data={this.state.theData} innerEar={this.innerEar} />
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
          <LocalMenu data={caches_local_menu} active={this.state.subpage} innerEar={this.innerEar} />
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
