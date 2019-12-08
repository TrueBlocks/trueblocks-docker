import React from 'react';
import { Fragment } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { polling } from './polling';
import { fmtInteger } from '../z_utils/number_fmt';

import green_light from '../z_img/connection-green-light.png';
import yellow_light from '../z_img/connection-yellow-light.png';
import red_light from '../z_img/connection-red-light.png';
import { refreshStatusPanel } from './connection_reducer';
// import './connection-debug.css';
import './connection.css';

const ConnectionDetails = (props) => {
  const client = props.chainStatus.client;
  const finalized = props.chainStatus.finalized;
  const staging = props.chainStatus.staging;
  const unripe = props.chainStatus.unripe;

  var final_behind = '';
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

  var status1 = (
    <div className={`${Number.isInteger(props.chainStatus.client) ? 'connected' : 'disconnected'}`}>
      {Number.isInteger(props.chainStatus.client) ? 'Connected' : 'Not Connected'}
    </div>
  );

  var status2 = (
    <div className={`${props.systemData.is_scraping ? 'connected' : 'disconnected'}`}>
      {props.systemData.is_scraping ? 'Scraping' : 'Not scraping'}
    </div>
  );

  return (
    <div>
      <div className="status-details">
        {/*---------------------------------------------------------------------------------
         */}
        <HeaderRow text="Ethereum Node" />
        <RegularRow head="Status" text={status1} />
        <RegularRow head="Latest" text={fmtInteger(client)} />
        <div className="separator" />
        {/*---------------------------------------------------------------------------------
         */}
        <HeaderRow text="TrueBlocks" />
        <RegularRow head="Status" text={status2} />
        <div className="left">
          <img className="traffic-light" alt={green_light} src={green_light} />
          Final
        </div>
        <div className="right">
          {fmtInteger(finalized)}{' '}
          <small>
            <i>
              <br />
              {final_behind}
            </i>
          </small>
        </div>
        <div className="left">
          <img className="traffic-light" alt={yellow_light} src={yellow_light} />
          Staged
        </div>
        <div className="right">
          {fmtInteger(staging)}{' '}
          <small>
            <i>
              <br />
              {staging_behind}
            </i>
          </small>
        </div>
        <div className="left">
          <img className="traffic-light" alt={red_light} src={red_light} />
          Unripe
        </div>
        <div className="right">
          {fmtInteger(unripe)}{' '}
          <small>
            <i>
              <br />
              {unripe_behind}
            </i>
          </small>
        </div>
        <div className="separator" />
        {/*---------------------------------------------------------------------------------
         */}
        <HeaderRow text="Options" />
        <DoubleWide head="rpcProvider:" text={props.systemData.rpc_provider} bold />
        <DoubleWide head="apiProvider:" text={props.systemData.api_provider} bold />
        <DoubleWide head="cachePath:" text={props.systemData.cache_path} bold />
        <DoubleWide head="indexPath:" text={props.systemData.index_path} bold />
        <div className="separator" />
        {/*---------------------------------------------------------------------------------
         */}
        <HeaderRow text="Software Versions" />
        <DoubleWide head="-" text={props.systemData.client_version} />
        <DoubleWide head="-" text={props.systemData.trueblocks_version} />
      </div>
    </div>
  );
};

const HeaderRow = (props) => {
  return (
    <Fragment>
      <div className="header">{props.text}</div>
    </Fragment>
  );
};

const RegularRow = (props) => {
  return (
    <Fragment>
      <div className="left">{props.head}:</div>
      <div className="right">{props.text}</div>
    </Fragment>
  );
};

const DoubleWide = (props) => {
  if (props.bold) {
    return (
      <div className="doublewide">
        <div className="doublewide-bold">{props.head}</div> {props.text}
      </div>
    );
  } else {
    return (
      <div className="doublewide">
        {props.head} {props.text}
      </div>
    );
  }
};

const mapStateToProps = ({ reducer_SystemStatus, chainStatus /*, getSettings*/ }) => ({
  isConnected: reducer_SystemStatus.isConnected,
  systemData: reducer_SystemStatus.systemData,
  isLoading: reducer_SystemStatus.isLoading,
  chainStatus: reducer_SystemStatus.chainStatus
  //apiProvider: getSettings.apiProvider
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      refreshStatusPanel,
      changePage: () => push('/a_settings-page')
    },
    dispatch
  );

export default polling(refreshStatusPanel, 10000)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectionDetails)
);
