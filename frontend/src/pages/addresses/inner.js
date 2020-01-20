//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Addresses } from './dispatchers';

import { isError, NotReady, isEmpty, EmptyQuery } from '../../components';
import { isReady } from '../../components';
import { DataTable } from '../../components';
import * as utils from '../../utils';
import './addresses.css';

// EXISTING_CODE
import { dispatcher_RemoveMonitor, dispatcher_AddMonitor } from './dispatchers';
import { OldDataTable } from '../../components';
const headings = ['', 'Name', 'First', 'Last', 'Range', 'Count', 'Interval', 'Bytes', 'Balance', ''];
// EXISTING_CODE

//----------------------------------------------------------------------
class AddressesInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_submenu: props.cur_submenu
    };
    // EXISTING_CODE
    this.innerEar = this.innerEar.bind(this);
    // EXISTING_CODE
  }

  componentDidMount = () => {
    this.props.dispatcher_Addresses(this.state.cur_submenu.route + '?' + this.state.cur_submenu.query);
  };

  // EXISTING_CODE
  innerEar = (cmd, submenu) => {
    var value = submenu.route + '/' + submenu.query;
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
  };
  // EXISTING_CODE

  getInnerPage = () => {
    if (isError(this.props)) return <NotReady {...this.props} />;
    else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    if (this.state.cur_submenu.query === 'monitors' || this.state.cur_submenu.route === 'status') {
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
    return <DataTable subpage="addresses" data={this.props.data} innerEar={this.innerEar} />;
  };

  render = () => {
    return (
      <Fragment>
        <div className="inner-panel">
          <div className="title inner-page">{utils.breadCrumb('Addresses', this.state.cur_submenu)}</div>
          {this.getInnerPage()}
        </div>
      </Fragment>
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
const mapStateToProps = ({ reducer_Status, reducer_Addresses }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_Status.isConnected,
  sysError: reducer_Status.error,
  isLoading: reducer_Addresses.isLoading,
  error: reducer_Addresses.error,
  data: reducer_Addresses.data,
  meta: reducer_Addresses.meta
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