import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { polling } from './polling';
import { fmtInteger } from '../utils/number_fmt';

import green_light from '../img/connection-green-light.png';
import yellow_light from '../img/connection-yellow-light.png';
import red_light from '../img/connection-red-light.png';
import { getConnectionStatus } from './connection_reducer';
import './connection.css';

/**
 * ConnectionComponent - show the status of the connection to both the node and TrueBlocks
 * @param  props Some data
 */
const ConnectionComponent = (props) => {
  return (
    <div className="left-panel">
      <h1>Connection</h1>
      <ConnectionDetails {...props} />
    </div>
  );
};

const ConnectionDetails = (props) => {
  const client = props.chainStatus.client;
  const finalized = props.chainStatus.finalized;
  const staging = props.chainStatus.staging;
  const unripe = props.chainStatus.unripe;

  var final_behind = '';
  console.log(props.chainStatus);
  if (props.chainStatus.client > 0) {
    final_behind = '(';
    final_behind += (props.chainStatus.client - props.chainStatus.finalized).toString();
    final_behind +=
      ' behind, ' +
      (Math.floor(((props.chainStatus.client - props.chainStatus.finalized) * 100) / (60 / 14)) / 100).toString() +
      ' minutes';
    final_behind += ')';
  }

  var staging_behind = '';
  if (props.chainStatus.client > 0) {
    staging_behind = '(' + (props.chainStatus.client - props.chainStatus.staging).toString();
    staging_behind +=
      ' behind, ' +
      (Math.floor(((props.chainStatus.client - props.chainStatus.staging) * 100) / (60 / 14)) / 100).toString() +
      ' minutes';
    staging_behind += ')';
  }

  var unripe_behind = '';
  if (props.chainStatus.client > 0) {
    unripe_behind = '(';
    if (props.chainStatus.client - props.chainStatus.unripe > 0) {
      unripe_behind += (props.chainStatus.client - props.chainStatus.unripe).toString();
      unripe_behind += ' behind';
    } else {
      unripe_behind += 'caught up';
    }
    unripe_behind += ')';
  }

  var indexPath = props.systemData.index_path;
  var cachePath = props.systemData.cache_path;

  return (
    <div>
      <div className={`system-details`}>
        <div className={`item grouping`}>Ethereum Node</div>
        <div className="item-left">Status:</div>
        <div className={`item-right ${Number.isInteger(props.chainStatus.client) ? 'connected' : 'disconnected'}`}>
          {Number.isInteger(props.chainStatus.client) ? 'Connected' : 'Disconnected'}
        </div>
        <div className="item-left">Last Block:</div>
        <div className="item-right">{fmtInteger(client)}</div>

        <div className="item grouping">TrueBlocks</div>
        <div className="item-left">Status:</div>
        <div className={`item-right ${props.systemData.is_scraping ? 'connected' : 'disconnected'}`}>
          {props.systemData.is_scraping ? 'Scraping' : 'Not Scraping'}
        </div>
        <div className="item-left">
          <img className="traffic_light" alt={green_light} src={green_light} />
          Final
        </div>
        <div className="item-right">
          {fmtInteger(finalized)}{' '}
          <small>
            <i>
              <br />
              {final_behind}
            </i>
          </small>
        </div>
        <div className="item-left">
          <img className="traffic_light" alt={yellow_light} src={yellow_light} />
          Staged
        </div>
        <div className="item-right">
          {fmtInteger(staging)}{' '}
          <small>
            <i>
              <br />
              {staging_behind}
            </i>
          </small>
        </div>
        <div className="item-left">
          <img className="traffic_light" alt={red_light} src={red_light} />
          Unripe
        </div>
        <div className="item-right">
          {fmtInteger(unripe)}{' '}
          <small>
            <i>
              <br />
              {unripe_behind}
            </i>
          </small>
        </div>

        <div className="item grouping">Options</div>
        <SmallRow text1="rpcProvider:" text2={props.systemData.rpc_provider} bold={true} />
        <SmallRow text1="apiProvider:" text2={props.systemData.api_provider} bold={true} />
        <SmallRow text1="cachePath:" text2={cachePath} bold={true} />
        <SmallRow text1="indexPath:" text2={indexPath} bold={true} />

        <div className="item grouping">Software Versions</div>
        <div className="item-both-small">- {props.systemData.client_version}</div>
        <div className="item-both-small">- {props.systemData.trueblocks_version}</div>
      </div>
    </div>
  );
};

const SmallRow = (props) => {
  if (props.bold) {
    return (
      <div className="item-both-small">
        <div className="item-both-small-bold">{props.text1}</div> {props.text2}
      </div>
    );
  } else {
    return (
      <div className="item-both-small">
        {props.text1} {props.text2}
      </div>
    );
  }
};

const mapStateToProps = ({ reducer_SystemStatus, chainStatus, getSettings }) => ({
  isConnected: reducer_SystemStatus.isConnected,
  systemData: reducer_SystemStatus.systemData,
  isLoading: reducer_SystemStatus.isLoading,
  chainStatus: reducer_SystemStatus.chainStatus,
  apiProvider: getSettings.apiProvider
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getConnectionStatus,
      changePage: () => push('/settings')
    },
    dispatch
  );

export default polling(getConnectionStatus, 10000)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectionComponent)
);
