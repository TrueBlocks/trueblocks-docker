//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Indicies } from './dispatchers';

import { LocalMenu } from '../../components';
import './indicies.css';

// EXISTING_CODE
import { Loading, Icon } from '../../components';
import * as ind from './actions';
import '../../index.css';
var Utils = require('../../utils');
// EXISTING_CODE

//----------------------------------------------------------------------
class IndiciesInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subpage: props.subpage
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  // EXISTING_CODE

  componentWillMount = () => {};

  componentDidMount = () => {
    this.innerEar('change_subpage', this.props.subpage);
  };

  innerEar = (cmd, value) => {
    if (cmd === 'change_subpage') {
      // update the local state...
      this.setState({
        subpage: value
      });
      // update the global state...
      this.props.dispatcher_Indicies(value);
      return;
    }

    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
    // EXISTING_CODE
    //if (!this.props.data) {
    //  return <Loading source="indicies" status="loading" message="Loading..." />;
    //}
    //return <SystemProgressChart {...this.props} />;
    // EXISTING_CODE
    return <div style={{ width: '98%' }}>Content of Indicies page with subpage: {this.state.subpage}</div>;
  };

  getInnerPage = () => {
    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <Fragment>
        <LocalMenu data={this.props.menu} active={this.state.subpage} innerEar={this.innerEar} />
        {this.getInnerMost()}
      </Fragment>
    );
  };

  render = () => {
    return (
      <Fragment>
        <div className="inner-panel">
          <div className="title inner-page">Indicies</div>
          {this.getInnerPage()}
        </div>
      </Fragment>
    );
  };
}

// EXISTING_CODE
//----------------------------------------------------------------------
class SystemProgressChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomStart: undefined
    };
  }

  clientHead = this.props.client === 'n/a' ? this.props.unripe : this.props.client;
  rows = Math.ceil(this.clientHead / 1e6);
  cols = 10;

  zoom = (zoomStart) => {
    this.setState({ ...this.state, zoomStart });
  };

  chart = (
    <div className="indicies-chart-container">
      <div className="indicies-grid"></div>
      {[...Array(this.cols).keys()].map((col, colI) => {
        return (
          <div className="indicies-y-axis indicies-grid" key={`x${col}`}>
            {Utils.fmtInteger(col * 1e5)}
          </div>
        );
      })}
      {[...Array(this.rows).keys()].map((row, rowI) => {
        return (
          <Fragment key={`x${row}`}>
            <div className="indicies-x-axis indicies-grid">{Utils.fmtInteger(row * 1e6)}</div>
            {[...Array(this.cols).keys()].map((col, colI) => {
              let indexClass;
              if (this.props.finalized >= row * 1e6 + (col + 1) * 1e5) {
                indexClass = 'finalized';
              } else if (this.props.finalized >= row * 1e6 + col * 1e5) {
                indexClass = 'in-progress';
              } else {
                indexClass = 'inactive';
              }
              return (
                <div className="indicies-grid" key={`x${row}${col}`}>
                  <div className={`filling ${indexClass}`} onClick={() => this.zoom(row * 1e6 + col * 1e5)}>
                    {indexClass === 'finalized' && '✔'}
                  </div>
                </div>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );

  cache_chart = (
    <div className="inner-index">
      <h4>Caches</h4>
      <p> </p>
      <div className="indicies-fun-facts">
        <div>
          <div className="indicies-fact-top">{this.props.caches[0].type}:</div>
          <div>{this.props.caches[0].path.replace(this.props.index_path, '$indexPath/')}</div>
          <div>
            {Utils.fmtInteger(this.props.caches[0].sizeInBytes)} / {Utils.fmtInteger(this.props.caches[0].nFiles)} /{' '}
            {Utils.fmtDouble(this.props.caches[0].sizeInBytes / this.props.caches[0].nFiles, 1)}
          </div>
        </div>
        <div>
          <div className="indicies-fact-top">{this.props.caches[1].type}:</div>
          <div>{this.props.caches[1].path.replace(this.props.cache_path, '$cachePath/')}</div>
          <div>
            {Utils.fmtInteger(this.props.caches[1].sizeInBytes)} / {Utils.fmtInteger(this.props.caches[1].nFiles)} /{' '}
            {Utils.fmtDouble(this.props.caches[1].sizeInBytes / this.props.caches[1].nFiles, 1)}
          </div>
        </div>
        <div>
          <div className="indicies-fact-top">{this.props.caches[2].type}:</div>
          <div>{this.props.caches[2].path.replace(this.props.cache_path, '$cachePath/')}</div>
          <div>
            {Utils.fmtInteger(this.props.caches[2].sizeInBytes)} / {Utils.fmtInteger(this.props.caches[2].nFiles)} /{' '}
            {Utils.fmtDouble(this.props.caches[2].sizeInBytes / this.props.caches[2].nFiles, 1)}
          </div>
        </div>
        <div>
          <div className="indicies-fact-top">{this.props.caches[3].type}:</div>
          <div>{this.props.caches[3].path.replace(this.props.cache_path, '$cachePath/')}</div>
          <div>
            {Utils.fmtInteger(this.props.caches[3].sizeInBytes)} / {Utils.fmtInteger(this.props.caches[3].nFiles)} /{' '}
            {Utils.fmtDouble(this.props.caches[3].sizeInBytes / this.props.caches[3].nFiles, 1)}
          </div>
        </div>
        <div>
          <div className="indicies-fact-top">{this.props.caches[4].type}:</div>
          <div>{this.props.caches[4].path.replace(this.props.cache_path, '$cachePath/')}</div>
          <div>
            {Utils.fmtInteger(this.props.caches[4].sizeInBytes)} / {Utils.fmtInteger(this.props.caches[4].nFiles)} /{' '}
            {Utils.fmtDouble(this.props.caches[4].sizeInBytes / this.props.caches[4].nFiles, 1)}
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <div>
        {this.chart}
        <p> </p>
        {this.cache_chart}
        <p> </p>
        <ZoomOnIndex {...this.props} start={this.state.zoomStart} n={1e5} />
      </div>
    );
  }
}

//----------------------------------------------------------------------
// Without this, the !props.loadingIndex test below is always true until one clicks on the page after relaod
var been_here = false;
const ZoomOnIndex = (props) => {
  let readyContainer;
  const hasData = props.data[0].items !== undefined && props.start !== undefined;
  switch (hasData) {
    case true:
      const filteredData = props.data[0].items.filter(
        (item) => (item.firstAppearance >= props.start) & (item.firstAppearance < props.start + props.n)
      );
      readyContainer = (
        <div>
          <IndexDetail data={filteredData} range={{ start: props.start, end: props.start + props.n }} />
        </div>
      );
      break;
    default:
      if (!been_here && !props.loadingIndex) {
        been_here = true;
        props.dispatcher_Indicies(ind.FINALIZED);
      }
      readyContainer = props.start && (
        <Loading source="indicies" status="loading" message="Waiting for index data..." />
      );
  }

  return <div>{readyContainer}</div>;
};

//----------------------------------------------------------------------
const IndexDetail = (props) => {
  const count = props.data.length;
  const subtit =
    'Details: ' +
    (count ? count : 'No') +
    ' finalized chunks in block range ' +
    props.range.start +
    '-' +
    props.range.end;
  return (
    <div className="inner-index">
      <h4>{subtit}</h4>
      <div className="indicies-index-container">
        {props.data.map((item) => (
          <div className="indicies-index-node" key={`x${item.firstAppearance}`}>
            <div>bloom hash:</div>{' '}
            <div className="indicies-inright_blue">
              {item.bloom_hash} <Icon icon="check_box" small onClick={null} />
            </div>
            <div>index hash:</div> <div className="indicies-inright_blue">{item.index_hash}</div>
            <div>first block:</div> <div className="indicies-inright">{Utils.fmtInteger(item.firstAppearance)}</div>
            <div>latest block:</div> <div className="indicies-inright">{Utils.fmtInteger(item.latestAppearance)}</div>
            <div>nBlocks:</div>{' '}
            <div className="indicies-inright">{Utils.fmtInteger(item.latestAppearance - item.firstAppearance + 1)}</div>
            <div>nAddresses:</div> <div className="indicies-inright">{Utils.fmtInteger(item.nAddresses)}</div>
            <div>nAppearances:</div> <div className="indicies-inright_red">{Utils.fmtInteger(item.nAppearances)}</div>
            <div>chunk size:</div> <div className="indicies-inright">{Utils.humanFileSize(item.indexSizeBytes)}</div>
            <div>bloom size:</div> <div className="indicies-inright">{Utils.humanFileSize(item.bloomSizeBytes)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Status, reducer_Indicies }) => ({
  // EXISTING_CODE
  caches: reducer_Status.systemData.caches,
  index_path: reducer_Status.systemData.index_path,
  cache_path: reducer_Status.systemData.cache_path,
  unripe: reducer_Status.unripe,
  staging: reducer_Status.staging,
  finalized: reducer_Status.finalized,
  client: reducer_Status.client,
  loadingIndex: reducer_Indicies.isLoading,
  // EXISTING_CODE
  sysConnected: reducer_Status.isConnected,
  sysError: reducer_Status.error,
  isLoading: reducer_Indicies.isLoading,
  error: reducer_Indicies.error,
  data: reducer_Indicies.data,
  meta: reducer_Indicies.meta,
  fieldList: reducer_Indicies.fieldList,
  menu: reducer_Indicies.menu
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_Indicies
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndiciesInner);