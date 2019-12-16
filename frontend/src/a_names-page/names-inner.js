/*-----------------------------------------------------------------------------*/
import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { polling } from '../z_components/polling';
import { poll_timeout } from '../config.js';
import { dispatcher_Names } from './names-getdata';
import { dispatcher_MonitorAdd } from '../a_monitors-page/monitors-add';

import Loading from '../z_components/loading';
import InnerHeader from '../z_components/inner-header';
import { Popup } from '../z_components/popup';
import { DetailTable } from './detail-table';
import { SummaryTable } from './summary-table';
import Icon from '../z_components/icon';

import { your_names } from './detail-data-your-names.js';
import { tokens } from './detail-data-tokens.js';
import { shared } from './detail-data-shared.js';
import { summary } from './summary-data.js';

import './names.css';
import './detail-table.css';
import './detail-table-names.css';

const name_fields = ['group/sub', 'address', 'name', 'symbol', 'logo', 'description', 'flags'];
var id = '';

/*-----------------------------------------------------------------------------*/
class NamesInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      current: '',
      data: id === '' ? null : id === 'Known Contracts' ? tokens : id === 'Community' ? shared : your_names
    };
    this.innerEar = this.innerEar.bind(this);
  }

  innerEar(cmd, value) {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');
    this.setState({ state: this.state });
    if (cmd === 'change_type') {
      id = value;
      console.log('ID: ', id);
      this.setState({
        data: id === '' ? null : id === 'Known Contracts' ? tokens : id === 'Community' ? shared : your_names,
        showPopup: false,
        current: {}
      });
      //      this.setState(this.state);
    } else if (cmd === 'expand') {
      if (value === this.state.current) {
        this.setState({
          data: id === '' ? null : id === 'Known Contracts' ? tokens : id === 'Community' ? shared : your_names,
          showPopup: false,
          current: {}
        });
      } else {
        this.setState({
          data: id === '' ? null : id === 'Known Contracts' ? tokens : id === 'Community' ? shared : your_names,
          showPopup: true,
          current: value
        });
      }
    } else if (cmd === 'monitor') {
      this.props.addMonitor(value);
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
    } else if (!this.props.isConnected || !this.props.names) {
      status = 'initializing';
    } else {
      status = 'ready';
    }
    status = 'ready';

    let container;
    switch (status) {
      case 'ready':
        container = (
          <div className="inner-panel">
            <SummaryTable data={summary} title="Summary" innerEar={this.innerEar} />
            <DetailTable
              type="names"
              title={'Detail of ' + id}
              fields={name_fields}
              data={this.state.data}
              innerEar={this.innerEar}
            />
          </div>
        );
        break;
      case 'error':
        container = <Loading status={status} message={this.props.error} />;
        break;
      case 'initializing':
      default:
        container = <Loading status={status} message="Initializing..." />;
        break;
    }

    return (
      <div className="right-panel">
        <InnerHeader
          title="Named Objects"
          notes="The Names component of TrueBlocks allows one to name various objects include
          any address (even if not previously monitored), any Solidity function or event signatures, and other relevant data.
          These names may be shared anonomously with the TrueBlocks community."
        />
        {this.state.showPopup ? (
          <NamePopup closePopup={this.closePopup.bind(this)} item={this.state.current} ear={this.innerEar} />
        ) : null}
        {container}
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

/*-----------------------------------------------------------------------------*/
const mapStateToProps = ({ reducer_Connection, reducer_Names }) => ({
  names: reducer_Names.names,
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error
});

/*-----------------------------------------------------------------------------*/
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_Names,
      addMonitor: (address) => dispatcher_MonitorAdd(address)
    },
    dispatch
  );

/*-----------------------------------------------------------------------------*/
export default polling(dispatcher_Names, poll_timeout)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NamesInner)
);
