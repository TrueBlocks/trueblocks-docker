import React, { Fragment } from 'react';
import { Loading } from 'components';
import { ObjectTable } from 'components';
import * as di from '../actions';
import 'index.css';
import '../digests.css';
import { fmtInteger } from 'utils';

//----------------------------------------------------------------------
class DigestChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomStart: undefined
    };
  }

  clientHead = this.props.client === 'n/a' ? this.props.unripe : this.props.client;
  rows = Math.ceil(this.clientHead / 1e6);

  zoom = (zoomStart) => {
    this.setState({ ...this.state, zoomStart });
  };

  chart = (
    <div className="digests-chart-container">
      <div className="digests-grid"></div>
      {[...Array(10).keys()].map((col, colI) => {
        return (
          <div className="digests-y-axis digests-grid" key={`x${col}`}>
            {fmtInteger(col * 1e5)}
          </div>
        );
      })}
      {[...Array(this.rows).keys()].map((row, rowI) => {
        return (
          <Fragment key={`x${row}`}>
            <div className="digests-x-axis digests-grid">{fmtInteger(row * 1e6)}</div>
            {[...Array(10).keys()].map((col, colI) => {
              let indexClass;
              if (this.props.finalized >= row * 1e6 + (col + 1) * 1e5) {
                indexClass = 'finalized';
              } else if (this.props.finalized >= row * 1e6 + col * 1e5) {
                indexClass = 'in-progress';
              } else {
                indexClass = 'inactive';
              }
              return (
                <div className="digests-grid" key={`x${row}${col}`}>
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
    return (
      <div>
        {this.chart}
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
        props.dispatcher_Digests(di.FINALIZED);
      }
      readyContainer = props.start && <Loading source="digests" status="loading" message="Waiting for index data..." />;
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
  const fieldList = [
    { name: 'type', type: 'string' },
    { name: 'index_hash', type: 'string', color: 'turquoise', bold: true },
    { name: 'bloom_hash', type: 'string', color: 'turquoise', bold: true },
    { name: 'nAppearances', type: 'unumber', color: 'red', bold: true },
    { name: 'nAddresses', type: 'unumber' },
    { name: 'firstAppearance', type: 'unumber' },
    { name: 'latestAppearance', type: 'unumber' },
    { name: 'firstTs', type: 'timestamp' },
    { name: 'lastestTs', type: 'timestamp' },
    { name: 'indexSizeBytes', type: 'unumber' },
    { name: 'bloomSizeBytes', type: 'unumber' }
    // { name: 'filename', type: 'string' },
  ];

  return (
    <div className="inner-index">
      <h4>{subtit}</h4>
      <div className="digests-index-container" style={{ paddingLeft: '15px' }}>
        {props.data.map((item) => (
          <ObjectTable
            options={{
              style: { width: '20%', margin: '1% 1% 0% 0%', padding: '100px' },
              header: false,
              sider: false,
              rightAlign: true
            }}
            object={item}
            theFields={fieldList}
            showNav={false}
          />
        ))}
      </div>
    </div>
  );
};

/*
{item.bloom_hash} <Icon icon="check_box" small onClick={null} />
*/

export default DigestChart;
