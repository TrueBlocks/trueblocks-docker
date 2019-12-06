import React from 'react';
import ConnectionComponent from '../components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMonitorStatus } from './monitor_getStatus';
import { reducer_MonitorRemove } from './monitor_remove';
import { reducer_MonitorAdd } from './monitor_add';
import { withPolling } from '../components/withPolling';
import { fmtDouble, fmtInteger } from '../utils/number_fmt';
import Loading from '../components/loading';
import trash from '../img/trash-alt.svg';

const MonitorStatus = (props) => {
  return (
    <div className="page">
      <ConnectionComponent props={props} />
      <div className="right-panel">
        <h1>
          Monitors
          <div className="description-note">
            Monitors are per-address index caches that enable fast reteival of appearance histories for any account.
          </div>
        </h1>
        <MonitorDetails {...props} />
      </div>
    </div>
  );
};

const MonitorDetails = (props) => {
  let status;
  if (props.isLoading) {
    status = 'loading';
  }
  if (props.error) {
    status = 'error';
  } else if (props.monitorData.items === undefined) {
    status = 'initializing';
  } else {
    status = 'ready';
  }

  let container;
  switch (status) {
    case 'ready':
      container = (
        <div className={`monitor-details`}>
          {props.monitorData.items.map((item, index) => (
            <MonitorDetail index={index} {...item} rmMonitor={props.rmMonitor} key={`a${item.address}`} />
          ))}
        </div>
      );
      break;
    case 'initializing':
      container = <Loading status={status} message="Initializing..." />;
      break;
    case 'error':
      container = <Loading status={status} message={`${props.error}`} />;
      break;
    default:
      container = <Loading status={status} message="Loading..." />;
  }

  return (
    <div>
      <MonitorAdd {...props} />
      {container}
    </div>
  );
};

const MonitorAdd = (props) => {
  let inputAddress;
  const onSubmit = (e) => {
    e.preventDefault();
    props.addMonitor(inputAddress.value);
  };
  return (
    <div className="monitor-add">
      <form onSubmit={onSubmit}>
        <input placeholder="0x000000000000000000000000000000000000000000" ref={(el) => (inputAddress = el)}></input>
        <button>＋ Add Monitor</button>
      </form>
    </div>
  );
};

class MonitorDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wasDeleted: false,
      isExpanded: false
    };
  }

  handleDel = (el) => {
    if (!this.state.wasDeleted) {
      this.props.rmMonitor(this.props.address);
      this.setState({ wasDeleted: true });
    }
  };

  toggle = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render() {
    const displayName =
      (this.props.group ? this.props.group + ': ' : '') + (this.props.name ? this.props.name : this.props.address);
    const ethBal = fmtDouble(this.props.curEther, 18);
    const f = fmtInteger(this.props.firstAppearance);
    const l = fmtInteger(this.props.latestAppearance);
    const d = fmtInteger(this.props.latestAppearance - this.props.firstAppearance);
    const n = fmtInteger(this.props.nRecords);
    const b = fmtInteger(
      (Math.floor((this.props.latestAppearance - this.props.firstAppearance) / this.props.nRecords) * 100) / 100
    );
    const m = fmtInteger(this.props.sizeInBytes);
    return (
      <div className={`detail-container ${this.state.wasDeleted ? 'disabled' : ''}`}>
        <div className="row-detail" onClick={this.toggle}>
          <div className="index">{this.props.index}</div>
          <div className="display-name">{displayName}</div>
          <div className="range">
            {f} / {l} / {d} / {n} / {b} / {m}
          </div>
          <div className="balance">{ethBal} ether</div>
          <div className="trash" onClick={this.handleDel}>
            <img alt={trash} src={trash} width="10px" />
          </div>
        </div>
        <div className={`detail-left ${!this.state.isExpanded ? 'hidden' : ''}`}>
          {this.props.name ? <li className="name">{this.props.name}</li> : null}
          {this.props.group ? (
            <li>{this.props.subgroup ? this.props.group + '/' + this.props.subgroup : this.props.group}</li>
          ) : null}
          <li className="address">{this.props.address}</li>
          {this.props.curEther !== 'n/a' ? <li>Ether balance = {this.props.curEther}</li> : null}
          <li>firstAppearance = {f}</li>
          <li>latestAppearance = {l}</li>
          <li>diff = {d}</li>
          <li>interval = {b}</li>
          <li className="val_green">nRecords = {n}</li>
          <li className="val_blue">fileSize = {m} bytes</li>
        </div>
        <div className={`detail-right ${!this.state.isExpanded ? 'hidden' : ''}`}>This is where I want the charts</div>
      </div>
    );
  }
}

const mapStateToProps = ({ reducer_Monitors, reducer_MonitorRemove }) => ({
  monitorData: reducer_Monitors.monitorStatus,
  error: reducer_Monitors.error,
  monitorDataFetch: {
    isLoading: reducer_Monitors.isLoading,
    error: reducer_Monitors.error
  },
  monitorRemove: reducer_MonitorRemove.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMonitorStatus,
      rmMonitor: (address) => reducer_MonitorRemove(address),
      addMonitor: (address) => reducer_MonitorAdd(address)
    },
    dispatch
  );

export default withPolling(getMonitorStatus, 20000)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MonitorStatus)
);

export const Monitors = (props) => (
  <div className="monitors">
    <MonitorStatus props={props} />
  </div>
);
