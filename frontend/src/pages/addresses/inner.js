//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Addresses } from './dispatchers';

import { InnerPageHeader, LocalMenu } from '../../components';
import { isError, NotReady, isEmpty, EmptyQuery } from '../../components';
import { isReady } from '../../components';
import { DataTable } from '../../components';
import './addresses.css';

// EXISTING_CODE
import { dispatcher_RemoveMonitor, dispatcher_AddMonitor } from './dispatchers';
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
    if (cmd === 'change_subpage') {
      // update the local state...
      this.setState({
        subpage: value
      });
      // update the global state...
      this.props.dispatcher_Addresses(value);
      return;
    }

    // EXISTING_CODE
    if (cmd === 'remove') {
      this.props.dispatcher_RemoveMonitor(value, true);
    } else if (cmd === 'delete' || cmd === 'undo') {
      this.props.dispatcher_RemoveMonitor(value, false);
    } else if (cmd === 'expand') {
      this.setState({
        subpage: value
      });
    } else if (cmd === 'monitor') {
      this.props.dispatcher_AddMonitor(value);
    }
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
    if (isError(this.props)) return <NotReady {...this.props} />;
    else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    if (this.state.subpage === 'addresses/monitors' || this.state.subpage.substring(0, 7) === 'status/') {
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
    // EXISTING_CODE
    return (
      <DataTable
        subpage="addresses"
        fields={this.props.fieldList}
        data={this.props.data}
        meta={this.props.meta}
        innerEar={this.innerEar}
      />
    );
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
    props.dispatcher_AddMonitor(inputAddress.value);
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
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_Connection.isConnected,
  sysError: reducer_Connection.error,
  isLoading: reducer_Addresses.isLoading,
  error: reducer_Addresses.error,
  data: reducer_Addresses.data,
  meta: reducer_Addresses.meta,
  fieldList: reducer_Addresses.fieldList,
  menu: reducer_Addresses.menu
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      dispatcher_RemoveMonitor,
      dispatcher_AddMonitor,
      // EXISTING_CODE
      dispatcher_Addresses
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressesInner);