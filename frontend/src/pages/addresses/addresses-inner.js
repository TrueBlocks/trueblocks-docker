//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Addresses } from './addresses-getdata';

import Loading from '../../components/loading';
import PageHeader from '../../components/page-header';
import { LocalMenu } from '../../components/local-menu';
import './addresses.css';

// EXISTING_CODE
import Identicon from '../../components/identicons';
import Icon from '../../components/icon';
import { DetailTable } from '../../components/detail-table';
import '../../components/detail-table.css';
import { summary_addresses_data } from '../../fake_data/summary-data';
import { your_names } from '../../fake_data/detail-data-your-names.js';
import { tokens } from '../../fake_data/detail-data-tokens.js';
import { shared } from '../../fake_data/detail-data-shared.js';
import { dispatcher_MonitorRemove } from './addresses-getdata-remove';
import { dispatcher_AddressAdd, AddNewAddress } from './addresses-getdata-add';
import NamePopup from '../../components/name-popup';
import '../dashboard/dashboard.css';
var Utils = require('../../utils');
const headings = ['', 'Name', 'First', 'Last', 'Range', 'Count', 'Interval', 'Bytes', 'Balance', ''];
const name_fields = ['group/sub', 'address', 'name', 'symbol', 'logo', 'description', 'flags'];
// EXISTING_CODE

//----------------------------------------------------------------------
class AddressesInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // EXISTING_CODE
      showPopup: false,
      current: '',
      data: your_names,
      // EXISTING_CODE
      subpage: 'addresses/custom'
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
    this.props.monitorDispatch();
  };
  // EXISTING_CODE

  innerEar = (cmd, value) => {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');

    // EXISTING_CODE
    var data = your_names;
    switch (value) {
      case 'addresses/known':
        data = tokens;
        break;
      case 'addresses/community':
        data = shared;
        break;
      default:
        data = your_names;
        break;
    }
    // EXISTING_CODE

    if (cmd === 'change_subpage') {
      this.setState({
        // EXISTING_CODE
        data: data,
        showPopup: false,
        current: {},
        // EXISTING_CODE
        subpage: value
      });
    } else if (cmd === 'goto_page') {
      window.open('/' + value.replace('/', '?sub='), '_self');
    }
    // EXISTING_CODE
    if (cmd === 'remove') {
      this.props.removeDispatch(value, true);
    } else if (cmd === 'delete' || cmd === 'undo') {
      this.props.removeDispatch(value, false);
    } else if (cmd === 'expand') {
      if (value === this.state.current) {
        this.setState({
          data: data,
          showPopup: false,
          current: {},
          subpage: value
        });
      } else {
        this.setState({
          data: data,
          showPopup: true,
          current: value,
          subpage: value
        });
      }
    }
    // EXISTING_CODE
  };

  // EXISTING_CODE
  getInner1 = () => {
    if (this.state.subpage === 'addresses/monitors') {
      return <Fragment></Fragment>;
    }

    if (this.state.showPopup) {
      return (
        <Fragment>
          <DetailTable css_pre="dashboard" fields={name_fields} data={this.state.data} innerEar={this.innerEar} />
          <NamePopup closePopup={this.closePopup.bind(this)} item={this.state.current} ear={this.innerEar} />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <DetailTable css_pre="dashboard" fields={name_fields} data={this.state.data} innerEar={this.innerEar} />
      </Fragment>
    );
  };

  getInner2 = () => {
    if (this.state.subpage !== 'addresses/monitors') {
      return <Fragment></Fragment>;
    }

    return (
      <Fragment>
        <AddNewAddress {...this.props} />
        <div className="data-table">
          <table className="data-table">
            <HeaderRow headings={headings} innerEar={this.innerEar} />
            <TableBody rows={this.props.monitorStatus.items} innerEar={this.innerEar} />
          </table>
        </div>
      </Fragment>
    );
  };
  // EXISTING_CODE

  getInner = () => {
    return (
      // EXISTING_CODE
      <Fragment>{this.state.subpage !== 'addresses/monitors' ? this.getInner1() : this.getInner2()}</Fragment>
      // EXISTING_CODE
    );
  };

  getContainer = () => {
    var isConnected = this.props.isConnected;
    // EXISTING_CODE
    if (this.props.error) {
      return <Loading status="error" message={this.props.error + '. Is the API running?'} />;
    }
    isConnected = this.props.isConnected && this.props.monitorStatus && this.props.monitorStatus.items;
    // EXISTING_CODE
    let container;
    if (this.props.error) {
      container = <Loading status="error" message={this.props.error} />;
    } else if (isConnected) {
      container = (
        <div className="inner-panel">
          <LocalMenu data={summary_addresses_data} active={this.state.subpage} innerEar={this.innerEar} />
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
        <div>
          <PageHeader
            title="Addresses"
            notes="Monitors are per-address index caches that enable fast reteival of transaction histories for any account. Note that the transactions/logs/receipts/traces are not downloaded until you explore an address."
          />
          {this.getContainer()}
        </div>
      </div>
    );
  };
}

// EXISTING_CODE
//---------------------------------------------------------------------
export class HeaderRow extends React.Component {
  render = () => {
    return (
      <thead>
        <tr key="header-0">
          {this.props.headings.map((field, cellIndex) => {
            return <HeaderCell {...this.props} key={`header-${cellIndex}`} content={field} />;
          })}
        </tr>
      </thead>
    );
  };
}

//---------------------------------------------------------------------
export class HeaderCell extends React.Component {
  sortClicked = (el) => {
    this.props.innerEar('sort', this.props.content);
  };

  render = () => {
    return (
      <th key={this.key} className={'dt-header'} onClick={this.sortClicked}>
        {this.props.content}
      </th>
    );
  };
}

//---------------------------------------------------------------------
export class TableBody extends React.Component {
  render = () => {
    return (
      <tbody>
        {this.props.rows.map((_row) => {
          return <BodyRow key={_row.address} {...this.props} row={_row} />;
        })}
      </tbody>
    );
  };
}

//---------------------------------------------------------------------
export class BodyRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: true,
      isExpanded: false,
      isDeleted: false
    };
    this.rowEar = this.rowEar.bind(this);
  }

  rowEar(cmd, address) {
    console.log('%crowEar - ' + cmd + ' address: ' + address, 'color:magenta');
    if (cmd === 'remove') {
      this.setState({ isShowing: false, isExpanded: false });
    } else if (cmd === 'delete') {
      this.setState({ isDeleted: true, isExpanded: false });
      this.props.row.deleted = true;
    } else if (cmd === 'undo') {
      this.setState({ isDeleted: false, isExpanded: false });
      this.props.row.deleted = false;
    } else if (cmd === 'expand') {
      this.setState({ isExpanded: !this.state.isExpanded });
    }
    if (address) this.props.innerEar('expand2', address); // pass it to the parent in case they're interested
  }

  render = () => {
    const g = this.props.row.group;
    //    const s = this.props.row.subgroup;
    const a = this.props.row.address;
    const n = this.props.row.name;
    const d = (g ? g + ': ' : '') + (n ? n : a) + (this.state.isExpanded ? '(expanded)' : '');
    const x = '';
    const f = Utils.fmtInteger(this.props.row.firstAppearance);
    const l = Utils.fmtInteger(this.props.row.latestAppearance);
    const r = Utils.fmtInteger(this.props.row.latestAppearance - this.props.row.firstAppearance);
    const c = Utils.fmtInteger(this.props.row.nRecords);
    const z = Utils.fmtInteger(this.props.row.sizeInBytes);
    const e = Utils.fmtDouble(this.props.row.curEther, 18);
    const b = ' ';
    const q = this.props.row.nRecords
      ? Utils.fmtInteger(
          (Math.floor((this.props.row.latestAppearance - this.props.row.firstAppearance) / this.props.row.nRecords) *
            100) /
            100
        )
      : 0;

    if (!this.state.isShowing) {
      return <Fragment></Fragment>;
    }

    var deleted = this.props.row.deleted || this.state.isDeleted;
    return (
      <tr
        key={this.props.row.address}
        className={this.props.row.deleted || this.state.isDeleted ? 'dt-row-deleted' : 'dt-row'}
      >
        <BodyCell key={a + '-x'} {...this.props} content={x} rowEar={this.rowEar} is_addr deleted={deleted} />
        <BodyCell key={a + '-d'} {...this.props} content={d} rowEar={this.rowEar} is_text />
        <BodyCell key={a + '-f'} {...this.props} content={f} rowEar={this.rowEar} />
        <BodyCell key={a + '-l'} {...this.props} content={l} rowEar={this.rowEar} />
        <BodyCell key={a + '-r'} {...this.props} content={r} rowEar={this.rowEar} />
        <BodyCell key={a + '-c'} {...this.props} content={c} rowEar={this.rowEar} />
        <BodyCell key={a + '-q'} {...this.props} content={q} rowEar={this.rowEar} />
        <BodyCell key={a + '-z'} {...this.props} content={z} rowEar={this.rowEar} />
        <BodyCell key={a + '-e'} {...this.props} content={e} rowEar={this.rowEar} />
        <IconCell key={a + '-b'} {...this.props} content={b} rowEar={this.rowEar} deleted={deleted} />
      </tr>
    );
  };
}

//---------------------------------------------------------------------
export class BodyCell extends React.Component {
  expandClicked = () => {
    this.props.rowEar('expand', this.props.row.address);
  };

  render = () => {
    var addr = this.props.row.address;
    if (this.props.is_addr && addr !== '') {
      return (
        <td className="dt-cell-center" onClick={this.expandClicked}>
          {addr.substr(0, 5)}...{addr.substr(addr.length - 4, addr.length)}{' '}
          <Identicon seed={addr} deleted={this.props.deleted} />
        </td>
      );
    }

    return (
      <td className={this.props.is_text ? 'dt-cell-left' : 'dt-cell-right'} onClick={this.expandClicked}>
        {this.props.content}
      </td>
    );
  };
}

//---------------------------------------------------------------------
export class IconCell extends React.Component {
  refreshClicked = () => {
    this.props.rowEar('refresh', this.props.address);
  };

  exploreClicked = () => {
    const url = '/explore/accounts/' + this.props.address;
    window.open(url, '_self');
  };

  removeClicked = () => {
    this.props.rowEar('remove', this.props.address);
    this.setState(this.state);
  };

  deleteClicked = () => {
    this.props.rowEar('delete', this.props.address);
    this.setState(this.state);
  };

  undoClicked = () => {
    this.props.rowEar('undo', this.props.address);
    this.setState(this.state);
  };

  launchClicked = () => {
    const url = 'https://etherscan.io/address/' + this.props.address;
    window.open(url, '_blank');
  };

  render = () => {
    if (this.props.deleted) {
      return (
        <td className="dt-cell-center">
          <Icon icon="launch" onClick={this.launchClicked} />
          <Icon icon="delete_forever" onClick={this.removeClicked} />
          <Icon icon="undo" onClick={this.undoClicked} />
        </td>
      );
    }

    return (
      <td className="dt-cell-center">
        <Icon icon="launch" onClick={this.launchClicked} />
        <Icon icon="list_alt" title="explore" onClick={this.exploreClicked} />
        <Icon icon="refresh" onClick={this.refreshClicked} />
        <Icon icon="delete_outline" title="delete" onClick={this.deleteClicked} />
      </td>
    );
  };
}
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_Addresses }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error,
  monitorStatus: reducer_Addresses.monitorStatus
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      monitorDispatch: () => dispatcher_Addresses(),
      removeDispatch: (address, remove) => dispatcher_MonitorRemove(address, remove),
      addMonitor: (address) => dispatcher_AddressAdd(address),
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
