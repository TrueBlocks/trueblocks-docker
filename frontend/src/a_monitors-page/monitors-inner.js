//---------------------------------------------------------------------
import React from 'react';
import { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Loading from '../z_components/loading';
import PageNotes from '../z_components/page-notes';
import { polling } from '../z_components/polling';
import { fmtDouble, fmtInteger } from '../z_utils/number_fmt';

import { getMonitorStatus } from './monitors-getdata';
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
        <h1>
          Address Monitors
          <PageNotes text="Monitors are per-address index caches that enable fast reteival of appearance histories for any account." />
        </h1>
        <div className="inner-panel">
          <h4 className="inner-panel">Current Monitors</h4>
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

    const displayName =
      (this.props.row.group ? this.props.row.group + ': ' : '') +
      (this.props.row.name ? this.props.row.name : this.props.row.address) +
      (this.state.isExpanded ? ' expanded' : ' not-expanded');
    return (
      <tr key={this.props.rowIndex} className="dt-row">
        <BodyCell key={`${this.props.rowIndex}-0`} content={this.props.rowIndex} rowEar={this.rowEar} />
        <BodyCell key={`${this.props.rowIndex}-1`} content={displayName} is_text rowEar={this.rowEar} />
        <BodyCell
          key={`${this.props.rowIndex}-2`}
          content={fmtInteger(this.props.row.firstAppearance)}
          rowEar={this.rowEar}
        />
        <BodyCell
          key={`${this.props.rowIndex}-3`}
          content={fmtInteger(this.props.row.latestAppearance)}
          rowEar={this.rowEar}
        />
        <BodyCell
          key={`${this.props.rowIndex}-4`}
          content={fmtInteger(this.props.row.latestAppearance - this.props.row.firstAppearance)}
          rowEar={this.rowEar}
        />
        <BodyCell key={`${this.props.rowIndex}-5`} content={fmtInteger(this.props.row.nRecords)} rowEar={this.rowEar} />
        <BodyCell
          key={`${this.props.rowIndex}-6`}
          content={fmtInteger(
            (Math.floor((this.props.row.latestAppearance - this.props.row.firstAppearance) / this.props.row.nRecords) *
              100) /
              100
          )}
          rowEar={this.rowEar}
        />
        <BodyCell
          key={`${this.props.rowIndex}-7`}
          content={fmtInteger(this.props.row.sizeInBytes)}
          rowEar={this.rowEar}
        />
        <BodyCell
          key={`${this.props.rowIndex}-8`}
          content={fmtDouble(this.props.row.curEther, 18)}
          rowEar={this.rowEar}
        />
        <BodyCell2 key={`${this.props.rowIndex}-9`} address={this.props.row.address} rowEar={this.rowEar} />
      </tr>
    );
  };
}

//---------------------------------------------------------------------
export class BodyCell extends React.Component {
  expandClicked = (el) => {
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
      getMonitorStatus,
      removeDispatch: (address) => dispatcher_MonitorRemove(address),
      addMonitor: (address) => dispatcher_MonitorAdd(address)
    },
    dispatch
  );

export default polling(getMonitorStatus, 50000)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MonitorsInner)
);
