//----------------------------------------------------------------------
import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../z_components/loading';
import InnerHeader from '../z_components/inner-header';
import { humanFileSize } from '../z_utils/filesize';
import { fmtDouble, fmtInteger } from '../z_utils/number_fmt';

import { dispatcher_AddressIndex } from './addresses-getdata';
import './addresses.css';

//----------------------------------------------------------------------
const AddressIndexInner = (props) => {
  let status;
  if (props.isLoading) {
    status = 'loading';
  }

  if (props.error) {
    status = 'error';
  } else if (props.caches === undefined || props.client === -1) {
    status = 'initializing';
  } else {
    status = 'ready';
  }

  let container;
  switch (status) {
    case 'ready':
      container = (
        <div className="inner-panel">
          <h4>Summary</h4>
          <SystemProgressChart {...props} />
        </div>
      );
      break;
    case 'initializing':
      container = <Loading status={status} message="Initializing..." />;
      break;
    case 'error':
      container = <Loading status={status} message={props.error} />;
      break;
    default:
      container = <Loading status={status} message="Loading..." />;
  }
  return (
    <div className="right-panel">
      <div>
        <InnerHeader
          title="Address Index"
          notes="The Address Index is the heart of TrueBlocks. It saves &lt;appearances&gt; of 
          each address anywhere in the blockchain. Storing only a tiny amount of data per appearance (&lt;blockNumber, 
          transactionId&gt;) allows TrueBlocks to operate on commercial-grade hardware."
        />
        {container}
      </div>
    </div>
  );
};

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
    <div className="chart-container">
      <div className="grid"></div>
      {[...Array(this.cols).keys()].map((col, colI) => {
        return (
          <div className="y-axis grid" key={`x${col}`}>
            {fmtInteger(col * 1e5)}
          </div>
        );
      })}
      {[...Array(this.rows).keys()].map((row, rowI) => {
        return (
          <Fragment key={`x${row}`}>
            <div className="x-axis grid">{fmtInteger(row * 1e6)}</div>
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
                <div className="grid" key={`x${row}${col}`}>
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
  render() {
    const cache0 = this.props.caches[0];
    const cache1 = this.props.caches[1];
    const cache2 = this.props.caches[2];
    const cache3 = this.props.caches[3];
    const cache4 = this.props.caches[4];
    // const cache5 = this.props.caches[5];
    // const cache6 = this.props.caches[6];
    // const cache7 = this.props.caches[7];
    // const cache8 = this.props.caches[8];

    const t0 = cache0.type;
    const t1 = cache1.type;
    const t2 = cache2.type;
    const t3 = cache3.type;
    const t4 = cache4.type;
    // const t5 = cache5.type;
    // const t6 = cache6.type;
    // const t7 = cache7.type;
    // const t8 = cache8.type;

    const p0 = cache0.path.replace(this.props.index_path, '$indexPath/');
    const p1 = cache1.path.replace(this.props.cache_path, '$cachePath/');
    const p2 = cache2.path.replace(this.props.cache_path, '$cachePath/');
    const p3 = cache3.path.replace(this.props.cache_path, '$cachePath/');
    const p4 = cache4.path.replace(this.props.cache_path, '$cachePath/');
    // const p5 = cache5.path.replace(this.props.cache_path, '$cachePath/');
    // const p6 = cache6.path.replace(this.props.cache_path, '$cachePath/');
    // const p7 = cache7.path.replace(this.props.cache_path, '$cachePath/');
    // const p8 = cache8.path.replace(this.props.cache_path, '$cachePath/');

    const s0 = fmtInteger(cache0.sizeInBytes);
    const s1 = fmtInteger(cache1.sizeInBytes);
    const s2 = fmtInteger(cache2.sizeInBytes);
    const s3 = fmtInteger(cache3.sizeInBytes);
    const s4 = fmtInteger(cache4.sizeInBytes);
    // const s5 = fmtInteger(cache5.sizeInBytes);
    // const s6 = fmtInteger(cache6.sizeInBytes);
    // const s7 = fmtInteger(cache7.sizeInBytes);
    // const s8 = fmtInteger(cache8.sizeInBytes);

    const c0 = fmtInteger(cache0.nFiles);
    const c1 = fmtInteger(cache1.nFiles);
    const c2 = fmtInteger(cache2.nFiles);
    const c3 = fmtInteger(cache3.nFiles);
    const c4 = fmtInteger(cache4.nFiles);
    // const c5 = fmtInteger(cache5.nFiles);
    // const c6 = fmtInteger(cache6.nFiles);
    // const c7 = fmtInteger(cache7.nFiles);
    // const c8 = fmtInteger(cache8.nFiles);

    const a0 = fmtDouble(cache0.sizeInBytes / cache0.nFiles, 1);
    const a1 = fmtDouble(cache1.sizeInBytes / cache1.nFiles, 1);
    const a2 = fmtDouble(cache2.sizeInBytes / cache2.nFiles, 1);
    const a3 = fmtDouble(cache3.sizeInBytes / cache3.nFiles, 1);
    const a4 = fmtDouble(cache4.sizeInBytes / cache4.nFiles, 1);
    // const a5 = fmtDouble(cache5.sizeInBytes / cache5.nFiles, 1);
    // const a6 = fmtDouble(cache6.sizeInBytes / cache6.nFiles, 1);
    // const a7 = fmtDouble(cache7.sizeInBytes / cache7.nFiles, 1);
    // const a8 = fmtDouble(cache8.sizeInBytes / cache8.nFiles, 1);

    return (
      <div>
        {this.chart}
        <p> </p>
        <div className="inner-panel">
          <h4>Caches</h4>
          <p> </p>
          <div className="fun-facts">
            <div>
              <div className="fact-top">{t0}:</div>
              <div>{p0}</div>
              <div>
                {s0} / {c0} / {a0}
              </div>
            </div>
            <div>
              <div className="fact-top">{t1}:</div>
              <div>{p1}</div>
              <div>
                {s1} / {c1} / {a1}
              </div>
            </div>
            <div>
              <div className="fact-top">{t2}:</div>
              <div>{p2}</div>
              <div>
                {s2} / {c2} / {a2}
              </div>
            </div>
            <div>
              <div className="fact-top">{t3}:</div>
              <div>{p3}</div>
              <div>
                {s3} / {c3} / {a3}
              </div>
            </div>
            <div>
              <div className="fact-top">{t4}:</div>
              <div>{p4}</div>
              <div>
                {s4} / {c4} / {a4}
              </div>
            </div>
            {/*
          <div>
            <div className="fact-top">{t5}:</div>
            <div>{p5}</div>
            <div>
              {s5} / {c5} / {a5}
            </div>
          </div>
          <div>
            <div className="fact-top">{t6}:</div>
            <div>{p6}</div>
            <div>
              {s6} / {c6} / {a6}
            </div>
          </div>
          <div>
            <div className="fact-top">{t7}:</div>
            <div>{p7}</div>
            <div>
              {s7} / {c7} / {a7}
            </div>
          </div>
          <div>
            <div className="fact-top">{t8}:</div>
            <div>{p8}</div>
            <div>
              {s8} / {c8} / {a8}
            </div>
          </div>
*/}
          </div>
        </div>
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
          <DetailTable data={filteredData} range={{ start: props.start, end: props.start + props.n }} />
        </div>
      );
      break;
    default:
      if (!been_here && !props.loadingIndex) {
        been_here = true;
        props.dispatcher_AddressIndex();
      }
      readyContainer = props.start && <Loading status="loading" message="Waiting for index data..." />;
  }

  return <div>{readyContainer}</div>;
};

//----------------------------------------------------------------------
const DetailTable = (props) => {
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
      <div className="index-container">
        {props.data.map((item) => (
          <div className="index-node" key={`x${item.firstAppearance}`}>
            <div>ipfs hash:</div> <div className="inright_blue">{item.hash}</div>
            <div>first block:</div> <div className="inright">{fmtInteger(item.firstAppearance)}</div>
            <div>latest block:</div> <div className="inright">{fmtInteger(item.latestAppearance)}</div>
            <div>nBlocks:</div>{' '}
            <div className="inright">{fmtInteger(item.latestAppearance - item.firstAppearance + 1)}</div>
            <div>nAddresses:</div> <div className="inright">{fmtInteger(item.nAddresses)}</div>
            <div>nAppearances:</div> <div className="inright_red">{fmtInteger(item.nAppearances)}</div>
            <div>file size:</div> <div className="inright">{humanFileSize(item.sizeInBytes)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_AddressIndex }) => ({
  caches: reducer_Connection.systemData.caches,
  index_path: reducer_Connection.systemData.index_path,
  cache_path: reducer_Connection.systemData.cache_path,
  isConnected: reducer_Connection.isConnected,
  unripe: reducer_Connection.unripe,
  staging: reducer_Connection.staging,
  finalized: reducer_Connection.finalized,
  client: reducer_Connection.client,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error,
  indexData: reducer_AddressIndex.indexData,
  loadingIndex: reducer_AddressIndex.isLoading
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_AddressIndex
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressIndexInner);
