import React from 'react';
import { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { polling } from '../polling';
import { fmtDouble, fmtInteger } from '../../utils';

import green_light from '../../img/status-green-light.png';
import yellow_light from '../../img/status-yellow-light.png';
import red_light from '../../img/status-red-light.png';
import { dispatcher_Status } from './status-actions';
import './status.css';

//---------------------------------------------------------------------
const StatusInner = (props) => {
  const client = props.client;
  const finalized = props.finalized;
  const staging = props.staging;

  var final_behind = '';
  if (client > 0) {
    final_behind = '(';
    final_behind += (client - finalized).toString();
    var mins = (Math.floor(((client - finalized) * 100) / (60 / 14)) / 100).toString();
    var x = mins + ' minutes';
    if (mins > 120) {
      x = fmtDouble(mins / 60, 1) + ' hours';
    }
    if (mins > 60 * 24) {
      x = fmtDouble(mins / (60 * 24), 1) + ' days';
    }
    final_behind += ' behind, ' + x;
    final_behind += ')';
  }

  var staging_behind = '';
  if (client > 0) {
    staging_behind = '(' + (client - staging).toString();
    mins = (Math.floor(((client - staging) * 100) / (60 / 14)) / 100).toString();
    x = mins + ' minutes';
    if (mins > 120) {
      x = fmtDouble(mins / 60, 1) + ' hours';
    }
    if (mins > 60 * 24) {
      x = fmtDouble(mins / (60 * 24), 1) + ' days';
    }
    staging_behind += ' behind, ' + x;
    staging_behind += ')';
  }

  var unripe_behind = '';
  if (client > 0) {
    unripe_behind = '(';
    if (client - props.unripe > 0) {
      unripe_behind += (client - props.unripe).toString();
      unripe_behind += ' behind';
    } else {
      unripe_behind += 'caught up';
    }
    unripe_behind += ')';
  }

  var status1 = (
    <div className={`${Number.isInteger(client) ? 'connected' : 'disconnected'}`}>
      {Number.isInteger(client) ? 'Connected' : 'Not Connected'}
    </div>
  );

  var status2 = (
    <div className={`${props.is_scraping ? 'connected' : 'disconnected'}`}>
      {props.is_scraping ? 'Scraping' : 'Not scraping'}
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
        <Separator />
        {/*---------------------------------------------------------------------------------
         */}
        <HeaderRow text="TrueBlocks" />
        <RegularRow head="Status" text={status2} />
        <div className="left">
          Final:
          <br />
          <img className="traffic-light" alt={green_light} src={green_light} />
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
          Staged:
          <br />
          <img className="traffic-light" alt={yellow_light} src={yellow_light} />
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
          Unripe:
          <br />
          <img className="traffic-light" alt={red_light} src={red_light} />
        </div>
        <div className="right">
          {fmtInteger(props.unripe)}{' '}
          <small>
            <i>
              <br />
              {unripe_behind}
            </i>
          </small>
        </div>
        <Separator />
        {/*---------------------------------------------------------------------------------
         */}
        <HeaderRow text="Options" />
        <DoubleWide head="rpc:" text={props.rpc_provider} bold />
        <DoubleWide head="bals:" text={props.balance_provider} bold />
        <DoubleWide head="api:" text={props.api_provider} bold />
        <DoubleWide head="cache:" text={props.cache_path} bold />
        <DoubleWide head="index:" text={props.index_path} bold />
        <Separator />
        {/*---------------------------------------------------------------------------------
         */}
        <HeaderRow text="Software Versions" />
        <DoubleWide head="-" text={props.client_version} />
        <DoubleWide head="-" text={props.trueblocks_version} />
      </div>
    </div>
  );
};

//---------------------------------------------------------------------
const HeaderRow = (props) => {
  return (
    <Fragment>
      <div className="header">{props.text}</div>
    </Fragment>
  );
};

//---------------------------------------------------------------------
const RegularRow = (props) => {
  return (
    <Fragment>
      <div className="left">{props.head}:</div>
      <div className="right">{props.text}</div>
    </Fragment>
  );
};

//---------------------------------------------------------------------
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

//---------------------------------------------------------------------
const Separator = (props) => {
  return <div className="separator" />;
};

//---------------------------------------------------------------------
const mapStateToProps = ({ reducer_Status }) => ({
  isConnected: reducer_Status.isConnected,
  is_scraping: reducer_Status.systemData.is_scraping,
  rpc_provider: reducer_Status.systemData.rpc_provider,
  balance_provider: reducer_Status.systemData.balance_provider,
  api_provider: reducer_Status.systemData.api_provider,
  cache_path: reducer_Status.systemData.cache_path,
  index_path: reducer_Status.systemData.index_path,
  client_version: reducer_Status.systemData.client_version,
  trueblocks_version: reducer_Status.systemData.trueblocks_version,
  unripe: reducer_Status.unripe,
  staging: reducer_Status.staging,
  finalized: reducer_Status.finalized,
  client: reducer_Status.client
});

//---------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_Status
    },
    dispatch
  );

//---------------------------------------------------------------------
export default polling(dispatcher_Status, 10000)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StatusInner)
);
