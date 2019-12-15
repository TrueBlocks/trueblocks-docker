//---------------------------------------------------------------------
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Loading from '../z_components/loading';
import InnerHeader from '../z_components/inner-header';
import { polling } from '../z_components/polling';
import { fmtDouble, fmtInteger } from '../z_utils/number_fmt';

import { dispatcher_Monitor } from './monitors-getdata';
import { dispatcher_MonitorRemove } from './monitors-remove';
import { dispatcher_MonitorAdd, AddNewMonitor } from './monitors-add';

import delete_icon from '../z_img/delete-24px.svg';
import refresh_icon from '../z_img/refresh-24px.svg';
import explore_icon from '../z_img/explore-24px.svg';
import './monitors.css';

const headings = ['Index', 'Name', 'First', 'Last', 'Range', 'Count', 'Interval', 'Bytes', 'Balance', ''];
//---------------------------------------------------------------------
class MonitorsInner extends React.Component {
  constructor(props) {
    super(props);
    this.innerEar = this.innerEar.bind(this);
  }

  innerEar(cmd, address) {
    console.log('%cinnerEar - ' + cmd + ' address: ' + address, 'color:orange');
    this.setState({ state: this.state });
    if (cmd === 'remove') {
      console.log('%c  innerEar - calling remove', 'color:orange');
      this.props.removeDispatch(address);
    }
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

    let container;
    switch (status) {
      case 'ready':
        container = (
          <div className="monitor-table">
            <AddNewMonitor {...this.props} />
            <div className="data-table">
              <table className="data-table">
                <HeaderRow headings={headings} innerEar={this.innerEar} />
                <TableBody rows={this.props.monitorData.items} innerEar={this.innerEar} />
              </table>
            </div>
          </div>
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
        <InnerHeader
          title="Address Monitors"
          notes="Monitors are per-address index caches that enable fast reteival of transaction histories for any account.
          Note that the transactions/logs/receipts/traces are not downloaded until you explore an address."
        />
        <div className="inner-panel">
          <h4>Current Monitors</h4>
          {container}
        </div>
      </div>
    );
  };
}

//---------------------------------------------------------------------
export class HeaderRow extends React.Component {
  constructor(props) {
    super(props);
    this.headerEar = this.headerEar.bind(this);
  }

  headerEar(cmd, field) {
    console.log('%cheaderEar - ' + cmd + ' field: ' + field, 'color:green');
    this.props.innerEar('sort', field);
  }

  render = () => {
    return (
      <thead>
        <tr key="header-0">
          {this.props.headings.map((field, cellIndex) => {
            return <HeaderCell key={`header-${cellIndex}`} headerEar={this.headerEar} content={field} />;
          })}
        </tr>
      </thead>
    );
  };
}

//---------------------------------------------------------------------
export class HeaderCell extends React.Component {
  sortClicked = (el) => {
    this.props.headerEar('sort', this.props.content);
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
  constructor(props) {
    super(props);
    this.bodyEar = this.bodyEar.bind(this);
  }

  bodyEar(cmd, address) {
    console.log('%cbodyEar - ' + cmd + ' address: ' + address, 'color:green');
    this.setState({ state: this.state });
    this.props.innerEar(cmd, address);
  }

  render = () => {
    return (
      <tbody>
        {this.props.rows.map((_row, rowIndex) => {
          return <BodyRow key={_row.address} row={_row} rowIndex={rowIndex} bodyEar={this.bodyEar} />;
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
      isDeleted: false,
      isExpanded: false
    };
    this.rowEar = this.rowEar.bind(this);
  }

  rowEar(cmd, address) {
    console.log('%crowEar - ' + cmd + ' address: ' + address, 'color:magenta');
    console.log('%crowEar - state: ', 'color:magenta', this.state);
    if (cmd === 'remove') {
      console.log('%c  rowEar - calling remove', 'color:magenta');
      this.setState({ isDeleted: true, isExpanded: false });
    } else if (cmd === 'expand') {
      console.log('%c  rowEar - toggling', 'color:magenta');
      this.setState({ isExpanded: !this.state.isExpanded });
    }
    console.log('%crowEar - new state: ', 'color:magenta', this.state);
    this.props.bodyEar(cmd, address);
  }

  render = () => {
    const i = this.props.rowIndex;
    const g = this.props.row.group;
    //    const s = this.props.row.subgroup;
    const a = this.props.row.address;
    const n = this.props.row.name;
    const d = (g ? g + ': ' : '') + (n ? n : a) + (this.state.isExpanded ? '(expanded)' : '');

    const f = fmtInteger(this.props.row.firstAppearance);
    const l = fmtInteger(this.props.row.latestAppearance);
    const r = fmtInteger(this.props.row.latestAppearance - this.props.row.firstAppearance);
    const c = fmtInteger(this.props.row.nRecords);
    const z = fmtInteger(this.props.row.sizeInBytes);
    const e = fmtDouble(this.props.row.curEther, 18);
    const q = this.props.row.nRecords
      ? fmtInteger(
          (Math.floor((this.props.row.latestAppearance - this.props.row.firstAppearance) / this.props.row.nRecords) *
            100) /
            100
        )
      : 0;

    return (
      <tr key={this.props.rowIndex} className={this.state.isDeleted ? 'dt-row-deleted' : 'dt-row'}>
        <BodyCell key={`${this.props.rowIndex}-0`} content={i} rowEar={this.rowEar} />
        <BodyCell key={`${this.props.rowIndex}-1`} content={d} rowEar={this.rowEar} is_text />
        <BodyCell key={`${this.props.rowIndex}-2`} content={f} rowEar={this.rowEar} />
        <BodyCell key={`${this.props.rowIndex}-3`} content={l} rowEar={this.rowEar} />
        <BodyCell key={`${this.props.rowIndex}-4`} content={r} rowEar={this.rowEar} />
        <BodyCell key={`${this.props.rowIndex}-5`} content={c} rowEar={this.rowEar} />
        <BodyCell key={`${this.props.rowIndex}-6`} content={q} rowEar={this.rowEar} />
        <BodyCell key={`${this.props.rowIndex}-7`} content={z} rowEar={this.rowEar} />
        <BodyCell key={`${this.props.rowIndex}-8`} content={e} rowEar={this.rowEar} />
        <IconCell key={`${this.props.rowIndex}-9`} address={a} rowEar={this.rowEar} />
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
    this.props.rowEar('explore', this.props.address);
  };

  deleteClicked = () => {
    this.props.rowEar('remove', this.props.address);
    this.setState(this.state);
  };

  onPing = () => {
    this.props.rowEar('ping', this.props.address);
  };

  render = () => {
    return (
      <td className="dt-cell-center">
        <img
          title="refresh"
          onMouseOver={this.onPing}
          alt={refresh_icon}
          src={refresh_icon}
          width="20px"
          onClick={this.refreshClicked}
        />
        &nbsp;
        <img title="explore" alt={explore_icon} src={explore_icon} width="20px" onClick={this.exploreClicked} />
        &nbsp;
        <img title="delete" alt={delete_icon} src={delete_icon} width="20px" onClick={this.deleteClicked} />
      </td>
    );
  };
}

//---------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_Monitors }) => ({
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  monitorData: reducer_Monitors.monitorStatus,
  error: reducer_Monitors.error,
  monitorDataFetch: {
    isLoading: reducer_Monitors.isLoading,
    error: reducer_Monitors.error
  }
});

//---------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_Monitor,
      removeDispatch: (address) => dispatcher_MonitorRemove(address),
      addMonitor: (address) => dispatcher_MonitorAdd(address),
      changePage: (address) => push('/explorer?address=' + address)
    },
    dispatch
  );

export default polling(dispatcher_Monitor, 20000)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MonitorsInner)
);
