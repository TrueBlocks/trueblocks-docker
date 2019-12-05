import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { getStatus } from '../home/getSystemStatus';
import { withPolling } from '../common/withPolling';
import { fmtInteger } from '../common/number_fmt';
import green_light from '../img/green.png';
import yellow_light from '../img/yellow.png';
import red_light from '../img/red.png';

const ConnectionComponent = (props) => {
  return (
    <div className="connect-panel">
      <h1>Connection</h1>
      <ConnectionDetails {...props} />
      <button onClick={props.changePage}>Settings</button>
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
        <div className={`item-right space-after ${props.systemData.is_scraping ? 'connected' : 'disconnected'}`}>
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

const mapStateToProps = ({ systemStatus, chainStatus, getSettings }) => ({
  isConnected: systemStatus.isConnected,
  systemData: systemStatus.systemData,
  isLoading: systemStatus.isLoading,
  chainStatus: systemStatus.chainStatus,
  apiProvider: getSettings.apiProvider
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getStatus,
      changePage: () => push('/settings')
    },
    dispatch
  );

export default withPolling(getStatus, 10000)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectionComponent)
);
