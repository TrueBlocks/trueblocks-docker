//---------------------------------------------------------------------
import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Loading from '../../components/loading';
import PageHeader from '../../components/page-header';
import Identicon from '../../components/identicons';
import Icon from '../../components/icon';
import { polling } from '../../components/polling';
import { Popup } from '../../components/popup';
import { SummaryTable } from '../../components/summary-table';
import { DetailTable } from '../../components/detail-table';
import { poll_timeout } from '../../config.js';

import '../../components/detail-table.css';

import { summary_addresses_data } from '../../fake_data/summary-data';
import { your_names } from '../../fake_data/detail-data-your-names.js';
import { tokens } from '../../fake_data/detail-data-tokens.js';
import { shared } from '../../fake_data/detail-data-shared.js';

import { dispatcher_Addresses } from './addresses-getdata';
import { dispatcher_MonitorRemove } from './addresses-getdata-remove';
import { dispatcher_AddressAdd, AddNewAddress } from './addresses-getdata-add';
import '../dashboard/dashboard.css';
import './addresses.css';

var Utils = require('../../utils');

const headings = ['', 'Name', 'First', 'Last', 'Range', 'Count', 'Interval', 'Bytes', 'Balance', ''];
const name_fields = ['group/sub', 'address', 'name', 'symbol', 'logo', 'description', 'flags'];
var id = 'addresses/monitors';
//---------------------------------------------------------------------
class AddressesInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      current: '',
      data: your_names,
      which: 'addresses/custom'
    };
    this.innerEar = this.innerEar.bind(this);
  }

  innerEar(cmd, value) {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');
    if (cmd === 'change_page' && value === '/') {
      this.setState(this.state);
      window.open('/' + value.replace('/', '?sub='), '_self');
      return;
    }

    var data = your_names;
    switch (value) {
      case 'addresses/known':
        console.log('SHIT');
        data = tokens;
        break;
      case 'addresses/community':
        data = shared;
        break;
      default:
        data = your_names;
        break;
    }

    if (cmd === 'change_page') {
      id = value;
      this.setState({
        data: data,
        showPopup: false,
        current: {},
        which: value
      });
    } else if (cmd === 'remove') {
      this.props.removeDispatch(value, true);
      this.props.monitorDispatch();
    } else if (cmd === 'delete' || cmd === 'undo') {
      this.props.removeDispatch(value, false);
    } else if (cmd === 'expand') {
      if (value === this.state.current) {
        this.setState({
          data: data,
          showPopup: false,
          current: {},
          which: value
        });
      } else {
        this.setState({
          data: data,
          showPopup: true,
          current: value,
          which: value
        });
      }
    }
  }

  closePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render = () => {
    let status;
    if (this.props.error) {
      status = 'error';
    } else if (!this.props.isConnected || !this.props.monitorData.items) {
      status = 'initializing';
    } else {
      status = 'ready';
    }

    let container, container2;
    switch (status) {
      case 'ready':
        container = (
          <Fragment>
            <SummaryTable data={summary_addresses_data} active={this.state.which} no_labels innerEar={this.innerEar} />
            <DetailTable css_pre="dashboard" fields={name_fields} data={this.state.data} innerEar={this.innerEar} />
          </Fragment>
        );
        container2 = (
          <Fragment>
            <SummaryTable data={summary_addresses_data} active={this.state.which} no_labels innerEar={this.innerEar} />
            <AddNewAddress {...this.props} />
            <div className="data-table">
              <table className="data-table">
                <HeaderRow headings={headings} innerEar={this.innerEar} />
                <TableBody rows={this.props.monitorData.items} innerEar={this.innerEar} />
              </table>
            </div>
          </Fragment>
        );
        break;
      case 'error':
        container = <Loading status={status} message={this.state ? this.state.error : 'Is the API running?'} />;
        break;
      case 'initializing':
      default:
        container = <Loading status={status} message="Initializing..." />;
        break;
    }

    return (
      <div className="right-panel">
        <PageHeader
          title="Addresses"
          notes="Monitors are per-address index caches that enable fast reteival of transaction histories for any account.
          Note that the transactions/logs/receipts/traces are not downloaded until you explore an address."
        />
        <div className="inner-panel">
          {this.state.which === 'addresses/monitors' ? container2 : container}
          {this.state.showPopup ? (
            <NamePopup closePopup={this.closePopup.bind(this)} item={this.state.current} ear={this.innerEar} />
          ) : null}
        </div>
      </div>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class NamePopup3Row extends Popup {
  addMonitorClicked = () => {
    this.props.ear('monitor', this.props.value);
  };

  exploreClicked = () => {
    this.props.ear('explore', this.props.value);
  };

  shareClicked = () => {
    this.props.ear('share', this.props.value);
  };

  deleteClicked = () => {
    this.props.ear('delete', this.props.value);
  };

  editClicked = () => {
    this.props.ear('edit', this.props.value);
  };

  render = () => {
    return (
      <div className="np_rt3">
        <div className="np_rt3_c1">{this.props.prompt}</div>
        <div className="np_rt3_c2">{this.props.value}</div>
        <div className="np_rt3_c3">
          <Icon icon="library_add" title="add monitor" onClick={this.addMonitorClicked} />
          <Icon icon="list_alt" title="explore" onClick={this.exploreClicked} />
          <Icon icon="share" onClick={this.shareClicked} />
          <Icon icon="delete" onClick={this.deleteClicked} />
          <Icon icon="edit" onClick={this.editClicked} />
        </div>
      </div>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class NamePopup2Row extends Popup {
  render = () => {
    return (
      <div className="np_rt2">
        <div className="np_rt2_c1">{this.props.prompt}</div>
        <div className="np_rt2_c2">{this.props.value}</div>
      </div>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class NamePopup extends Popup {
  render = () => {
    return (
      <div className="popup">
        <NamePopup3Row prompt="Address:" value={this.props.item.address} ear={this.props.ear} />
        <NamePopup2Row prompt="Group:" value={this.props.item.group} />
        <NamePopup2Row prompt="Subgroup:" value={this.props.item.subgroup} />
        <NamePopup2Row prompt="Name:" value={this.props.item.name} />
        <NamePopup2Row prompt="Symbol:" value={this.props.item.symbol} />
        <NamePopup2Row prompt="Description:" value={this.props.item.description} />
        <NamePopup2Row prompt="Source:" value={this.props.item.source} />
        <NamePopup2Row prompt="Logo:" value={this.props.item.logo} />
        <NamePopup2Row prompt="isContract:" value={this.props.item.is_contract} />
        <NamePopup2Row prompt="isPrivate:" value={this.props.item.is_private} />
        <NamePopup2Row prompt="isShared:" value={this.props.item.is_shared} />
      </div>
    );
  };
}
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
        {this.props.rows.map((_row, rowIndex) => {
          return <BodyRow {...this.props} key={_row.address} row={_row} rowIndex={rowIndex} />;
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
    this.props.innerEar(cmd, address); // pass it to the parent in case they're interested
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
        <BodyCell key={`${this.props.rowIndex}-0`} content={x} rowEar={this.rowEar} address={a} deleted={deleted} />
        <BodyCell key={`${this.props.rowIndex}-1`} content={d} rowEar={this.rowEar} is_text />
        <BodyCell key={`${this.props.rowIndex}-2`} content={f} rowEar={this.rowEar} />
        <BodyCell key={`${this.props.rowIndex}-3`} content={l} rowEar={this.rowEar} />
        <BodyCell key={`${this.props.rowIndex}-4`} content={r} rowEar={this.rowEar} />
        <BodyCell key={`${this.props.rowIndex}-5`} content={c} rowEar={this.rowEar} />
        <BodyCell key={`${this.props.rowIndex}-6`} content={q} rowEar={this.rowEar} />
        <BodyCell key={`${this.props.rowIndex}-7`} content={z} rowEar={this.rowEar} />
        <BodyCell key={`${this.props.rowIndex}-8`} content={e} rowEar={this.rowEar} />
        <IconCell key={`${this.props.rowIndex}-9`} address={a} rowEar={this.rowEar} deleted={deleted} />
      </tr>
    );
  };
}

//---------------------------------------------------------------------
export class BodyCell extends React.Component {
  expandClicked = () => {
    this.props.rowEar('expand', this.props.address);
  };

  render = () => {
    var addr = this.props.address || '';
    if (addr !== '') {
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
    const url = '/explorer/' + this.props.address;
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

//---------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_Addresses }) => ({
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  monitorData: reducer_Addresses.monitorStatus,
  error: reducer_Addresses.error,
  monitorDataFetch: {
    isLoading: reducer_Addresses.isLoading,
    error: reducer_Addresses.error
  }
});

//---------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      monitorDispatch: () => dispatcher_Addresses(),
      removeDispatch: (address, remove) => dispatcher_MonitorRemove(address, remove),
      addMonitor: (address) => dispatcher_AddressAdd(address)
    },
    dispatch
  );

export default polling(dispatcher_Addresses, poll_timeout)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddressesInner)
);
