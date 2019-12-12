//---------------------------------------------------------------------
import React from 'react';
import { Fragment } from 'react';
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

  getContainer = (props) => {
    var container;
    if (this.props.error) {
      // Error case...
      container = (
        <Fragment>
          <Loading status="error" message={`${this.props.error}`} />
        </Fragment>
      );
    } else if (!this.props.isConnected || this.props.monitorData.items === undefined) {
      // Loading case...
      container = (
        <Fragment>
          <Loading status="initializing" message="Initializing..." />
        </Fragment>
      );
    } else {
      // Display case...
      container = (
        <Fragment>
          <div className="monitor-table">
            <AddNewMonitor {...this.props} />
            <MonitorTable headings={headings} rows={this.props.monitorData.items} innerEar={this.innerEar} />
          </div>
        </Fragment>
      );
    }
    return container;
  };

  render = () => {
    this.getContainer = this.getContainer.bind(this);
    const theMarkup = this.getContainer(this.props);
    return (
      <div className="right-panel">
        <InnerHeader
          title="Address Monitors"
          notes="Monitors are per-address index caches that enable fast reteival of transaction histories for any account.
          Note that the transactions/logs/receipts/traces are not downloaded until you explore an address."
        />
        <div className="inner-panel">
          <h4>Current Monitors</h4>
          {theMarkup}
        </div>
      </div>
    );
  };
}

//---------------------------------------------------------------------
export class MonitorTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableEar = this.tableEar.bind(this);
  }

  tableEar(cmd, address) {
    console.log('%ctableEar - ' + cmd + ' address: ' + address, 'color:blue');
    this.props.innerEar(cmd, address);
  }

  render = () => {
    const { headings, rows } = this.props;
    return (
      <div className="data-table">
        <table className="data-table">
          <TableHeader headings={headings} />
          <TableBody rows={rows} tableEar={this.tableEar} />
        </table>
      </div>
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
    this.props.tableEar(cmd, address);
  }

  renderRow = (_row, rowIndex) => {
    return <BodyRow key={rowIndex} row={_row} rowIndex={rowIndex} bodyEar={this.bodyEar} />;
  };

  render = () => {
    return <tbody>{this.props.rows.map(this.renderRow.bind(this))}</tbody>;
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
    if (this.state.isDeleted) {
      return <Fragment key={`${this.props.rowIndex}`}></Fragment>;
    }

    const i = this.props.rowIndex;
    const g = this.props.row.group;
    const s = this.props.row.subgroup;
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

    // if (this.state.isExpanded) {
    //   return (
    //     <tr key={this.props.rowIndex} className="dt-row">
    //       <BodyCell1 key={`${this.props.rowIndex}-0`} content={i} rowEar={this.rowEar} />
    //       <BodyCell1 key={`${this.props.rowIndex}-1`} content={`${g}: ${n} ${z}`} rowEar={this.rowEar} is_text />
    //       <BodyChart key={`${this.props.rowIndex}-2`} content={e} rowEar={this.rowEar} is_text />
    //     </tr>
    //   );
    // }

    return (
      <tr key={this.props.rowIndex} className="dt-row">
        <BodyCell1 key={`${this.props.rowIndex}-0`} content={i} rowEar={this.rowEar} />
        <BodyCell1 key={`${this.props.rowIndex}-1`} content={d} rowEar={this.rowEar} is_text />
        <BodyCell1 key={`${this.props.rowIndex}-2`} content={f} rowEar={this.rowEar} />
        <BodyCell1 key={`${this.props.rowIndex}-3`} content={l} rowEar={this.rowEar} />
        <BodyCell1 key={`${this.props.rowIndex}-4`} content={r} rowEar={this.rowEar} />
        <BodyCell1 key={`${this.props.rowIndex}-5`} content={c} rowEar={this.rowEar} />
        <BodyCell1 key={`${this.props.rowIndex}-6`} content={q} rowEar={this.rowEar} />
        <BodyCell1 key={`${this.props.rowIndex}-7`} content={z} rowEar={this.rowEar} />
        <BodyCell1 key={`${this.props.rowIndex}-8`} content={e} rowEar={this.rowEar} />
        <BodyCell2 key={`${this.props.rowIndex}-9`} address={a} rowEar={this.rowEar} />
      </tr>
    );
  };
}

//---------------------------------------------------------------------
export class BodyCell1 extends React.Component {
  expandClicked = (el) => {
    //window.location.assign('/explorer');
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
export class BodyChart extends React.Component {
  expandClicked = (el) => {
    window.location.assign('/explorer');
    //      this.props.rowEar('expand', this.props.address);
  };

  render = () => {
    return (
      <td colSpan="8" className={this.props.is_text ? 'dt-cell-left' : 'dt-cell-right'} onClick={this.props.changePage}>
        {this.props.content}
      </td>
    );
  };
}

//---------------------------------------------------------------------
export class BodyCell2 extends React.Component {
  refreshClicked = () => {
    this.props.rowEar('refresh', this.props.address);
  };

  exploreClicked = () => {
    this.props.rowEar('explore', this.props.address);
  };

  deleteClicked = () => {
    this.props.rowEar('remove', this.props.address);
  };

  onPing = () => {
    this.props.rowEar('ping', this.props.address);
  };

  render = () => {
    return (
      <td className="dt-cell-center">
        <img
          onMouseOver={this.onPing}
          alt={refresh_icon}
          src={refresh_icon}
          width="20px"
          onClick={this.refreshClicked}
        />
        &nbsp;
        <img alt={explore_icon} src={explore_icon} width="20px" onClick={this.exploreClicked} />
        &nbsp;
        <img alt={delete_icon} src={delete_icon} width="20px" onClick={this.deleteClicked} />
      </td>
    );
  };
}

//---------------------------------------------------------------------
export class TableHeader extends React.Component {
  renderHeader = (_cell, cellIndex) => {
    return (
      <th key={`header-${cellIndex}`} className="dt-header">
        {this.props.headings[cellIndex]}
      </th>
    );
  };
  render = () => {
    return (
      <thead>
        <tr key="header-0">{this.props.headings.map(this.renderHeader.bind(this))}</tr>
      </thead>
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
