//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Addresses } from './dispatchers';

import { InnerPageHeader, DetailTable, LocalMenu, isReady, NotReady } from '../../components';
import { addresses_local_menu } from '../../fake_data/summary-data';
import './addresses.css';

// EXISTING_CODE
import '../../components/detail-table.css';
import { dispatcher_RemoveMonitor, dispatcher_AddMonitor } from './dispatchers';
import DetailPopup from '../../components/detail-popup';
import OldDataTable from '../../components/old-data-table';
const headings = ['', 'Name', 'First', 'Last', 'Range', 'Count', 'Interval', 'Bytes', 'Balance', ''];
// EXISTING_CODE

//----------------------------------------------------------------------
class AddressesInner extends React.Component {
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
      var query = 'modes=monitors&details&ether';
      this.props.dispatcher_Addresses('status', query);
    }

    // EXISTING_CODE
    if (cmd === 'remove') {
      this.props.removeAddress(value, true);
    } else if (cmd === 'delete' || cmd === 'undo') {
      this.props.removeAddress(value, false);
    } else if (cmd === 'expand') {
      this.setState({
        subpage: value
      });
    } else if (cmd === 'monitor') {
      this.props.addAddress(value);
    }
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
    // EXISTING_CODE
    if (false && this.state.subpage === 'addresses/monitors') {
      return (
        <Fragment>
          <AddNewAddress {...this.props} />
          <div className="old-data-table">
            <OldDataTable headings={headings} rows={this.props.data} innerEar={this.innerEar} />
          </div>
          ;
        </Fragment>
      );
    }

    return (
      <Fragment>
        <DetailTable css_pre="addresses" data={this.props.data} innerEar={this.innerEar} />
      </Fragment>
    );
    // EXISTING_CODE
    // return <DetailTable css_pre="addresses" data={this.props.data} innerEar={this.innerEar} />;
  };

  getInnerPage = () => {
    if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;

    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <Fragment>
        <LocalMenu data={addresses_local_menu} active={this.state.subpage} innerEar={this.innerEar} />
        {this.getInnerMost()}
      </Fragment>
    );
  };

  render = () => {
    return (
      <div className="right-panel">
        <InnerPageHeader
          title="Addresses"
          notes="Monitors are per-address index caches that enable fast reteival of transaction histories for any account. Note that the transactions/logs/receipts/traces are not downloaded until you explore an address."
        />
        {this.getInnerPage()}
      </div>
    );
  };
}

// EXISTING_CODE
//---------------------------------------------------------------------
export const AddNewAddress = (props) => {
  let inputAddress;

  const onSubmit = (el) => {
    el.preventDefault();
    props.addAddress(inputAddress.value);
  };

  return (
    <div className="address-add">
      <form onSubmit={onSubmit}>
        <input placeholder="0x0000...0000" ref={(user_input) => (inputAddress = user_input)}></input>
        <button>Add Monitor</button>
      </form>
    </div>
  );
};
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_Addresses }) => ({
  sysConnected: reducer_Connection.isConnected,
  sysError: reducer_Connection.error,
  isLoading: reducer_Addresses.isLoading,
  error: reducer_Addresses.error,
  data: reducer_Addresses.data
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeAddress: (address, remove) => dispatcher_RemoveMonitor(address, remove),
      addAddress: (address) => dispatcher_AddMonitor(address),
      dispatcher_Addresses
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressesInner);
