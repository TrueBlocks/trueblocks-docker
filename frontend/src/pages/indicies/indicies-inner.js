//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Indicies } from './indicies-getdata';

import Loading from '../../components/loading';
import PageHeader from '../../components/page-header';
import { LocalMenu } from '../../components/local-menu';
import './indicies.css';

// EXISTING_CODE
import { summary_indicies_data } from '../../fake_data/summary-data';
import { humanFileSize, fmtDouble, fmtInteger } from '../../utils';
import '../../index.css';
// EXISTING_CODE

//----------------------------------------------------------------------
class IndiciesInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // EXISTING_CODE
      // EXISTING_CODE
      subpage: 'indicies/full'
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  // EXISTING_CODE

  innerEar = (cmd, value) => {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');

    // EXISTING_CODE
    // EXISTING_CODE

    if (cmd === 'change_subpage') {
      this.setState({
        // EXISTING_CODE
        // EXISTING_CODE
        subpage: value
      });
    } else if (cmd === 'goto_page') {
      window.open('/' + value.replace('/', '?sub='), '_self');
    }
    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInner = () => {
    return (
      // EXISTING_CODE
      <SystemProgressChart {...this.props} />
      // EXISTING_CODE
    );
  };

  getContainer = () => {
    var isConnected = this.props.isConnected;
    // EXISTING_CODE
    isConnected = this.props.caches !== undefined && this.props.client !== -1;
    // EXISTING_CODE
    let container;
    if (this.props.error) {
      container = <Loading status="error" message={this.props.error} />;
    } else if (isConnected) {
      container = (
        <div className="inner-panel">
          <LocalMenu data={summary_indicies_data} active={this.state.subpage} innerEar={this.innerEar} />
          {this.getInner()}
        </div>
      );
    } else {
      container = <Loading status="initializing" message="Loading..." />;
    }
    return container;
  };

  render = () => {
    return (
      <div className="right-panel">
        <PageHeader
          title="Indicies"
          notes="TrueBlocks index of appearances greatly speed up access to the Ethereum data; however, they take up a 
            lot of space on your hard drive, so you have to keep any eye on them. Clean them out periodically so they don't get too big."
        />
        {this.getContainer()}
      </div>
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
            {fmtInteger(col * 1e5)}
          </div>
        );
      })}
      {[...Array(this.rows).keys()].map((row, rowI) => {
        return (
          <Fragment key={`x${row}`}>
            <div className="indicies-x-axis indicies-grid">{fmtInteger(row * 1e6)}</div>
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
    <div className="inner-panel">
      <h4>Caches</h4>
      <p> </p>
      <div className="indicies-fun-facts">
        <div>
          <div className="indicies-fact-top">{this.props.caches[0].type}:</div>
          <div>{this.props.caches[0].path.replace(this.props.index_path, '$indexPath/')}</div>
          <div>
            {fmtInteger(this.props.caches[0].sizeInBytes)} / {fmtInteger(this.props.caches[0].nFiles)} /{' '}
            {fmtDouble(this.props.caches[0].sizeInBytes / this.props.caches[0].nFiles, 1)}
          </div>
        </div>
        <div>
          <div className="indicies-fact-top">{this.props.caches[1].type}:</div>
          <div>{this.props.caches[1].path.replace(this.props.index_path, '$indexPath/')}</div>
          <div>
            {fmtInteger(this.props.caches[1].sizeInBytes)} / {fmtInteger(this.props.caches[1].nFiles)} /{' '}
            {fmtDouble(this.props.caches[1].sizeInBytes / this.props.caches[1].nFiles, 1)}
          </div>
        </div>
        <div>
          <div className="indicies-fact-top">{this.props.caches[2].type}:</div>
          <div>{this.props.caches[2].path.replace(this.props.index_path, '$indexPath/')}</div>
          <div>
            {fmtInteger(this.props.caches[2].sizeInBytes)} / {fmtInteger(this.props.caches[2].nFiles)} /{' '}
            {fmtDouble(this.props.caches[2].sizeInBytes / this.props.caches[2].nFiles, 1)}
          </div>
        </div>
        <div>
          <div className="indicies-fact-top">{this.props.caches[3].type}:</div>
          <div>{this.props.caches[3].path.replace(this.props.index_path, '$indexPath/')}</div>
          <div>
            {fmtInteger(this.props.caches[3].sizeInBytes)} / {fmtInteger(this.props.caches[3].nFiles)} /{' '}
            {fmtDouble(this.props.caches[3].sizeInBytes / this.props.caches[3].nFiles, 1)}
          </div>
        </div>
        <div>
          <div className="indicies-fact-top">{this.props.caches[4].type}:</div>
          <div>{this.props.caches[4].path.replace(this.props.index_path, '$indexPath/')}</div>
          <div>
            {fmtInteger(this.props.caches[4].sizeInBytes)} / {fmtInteger(this.props.caches[4].nFiles)} /{' '}
            {fmtDouble(this.props.caches[4].sizeInBytes / this.props.caches[4].nFiles, 1)}
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
  const hasData = props.indexData.items !== undefined && props.start !== undefined;
  switch (hasData) {
    case true:
      const filteredData = props.indexData.items.filter(
        (item) =>
          item.path.startsWith('finalized') &
          (item.firstAppearance >= props.start) &
          (item.firstAppearance < props.start + props.n)
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
        props.dispatcher_Indicies();
      }
      readyContainer = props.start && <Loading status="loading" message="Waiting for index data..." />;
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
    <div className="inner-panel">
      <h4>{subtit}</h4>
      <div className="indicies-index-container">
        {props.data.map((item) => (
          <div className="indicies-index-node" key={`x${item.firstAppearance}`}>
            <div>ipfs hash:</div> <div className="indicies-inright_blue">{item.hash}</div>
            <div>first block:</div> <div className="indicies-inright">{fmtInteger(item.firstAppearance)}</div>
            <div>latest block:</div> <div className="indicies-inright">{fmtInteger(item.latestAppearance)}</div>
            <div>nBlocks:</div>{' '}
            <div className="indicies-inright">{fmtInteger(item.latestAppearance - item.firstAppearance + 1)}</div>
            <div>nAddresses:</div> <div className="indicies-inright">{fmtInteger(item.nAddresses)}</div>
            <div>nAppearances:</div> <div className="indicies-inright_red">{fmtInteger(item.nAppearances)}</div>
            <div>file size:</div> <div className="indicies-inright">{humanFileSize(item.sizeInBytes)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_Indicies }) => ({
  // EXISTING_CODE
  caches: reducer_Connection.systemData.caches,
  index_path: reducer_Connection.systemData.index_path,
  cache_path: reducer_Connection.systemData.cache_path,
  unripe: reducer_Connection.unripe,
  staging: reducer_Connection.staging,
  finalized: reducer_Connection.finalized,
  client: reducer_Connection.client,
  loadingIndex: reducer_Indicies.isLoading,
  // EXISTING_CODE
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error,
  indexData: reducer_Indicies.indexData
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
