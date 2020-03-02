//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Row from './Row';
import '../ObjectTable.css';
import { getKeys } from 'utils';

//----------------------------------------------------------------------
function Body({ theFields, object, side, right }) {
  if (!theFields || theFields.length === 0) {
    return <div>No field list</div>;
  }
  return (
    <div className={side ? 'ot_tbody' : 'ot_body_1'}>
      <div className="ot_data">
        {theFields.map((field, index) => {
          return <Row {...getKeys('otb_' + index + '_')} object={object} field={field} index={index} right={right} />;
        })}
      </div>
      {side ? <DetailPanel address={object.address} /> : <Fragment />}
    </div>
  );
}

//----------------------------------------------------------------------
function DetailPanel({ address }) {
  return (
    <div className="ot_chart">
      <Link to="/support/about_us/+about_us">Meta</Link>
      <div>Address: {address}</div>
      <hr />
      <Link to={'/explore/accounts/export+addrs=' + address + '&occurrence=0&all_abis&articulate'}>Explore</Link>
      <br />
      <Link to="/explore/accounts">Basic Charting</Link>
      <br />
      <Link to="/explore/accounts">Export to Excel</Link>
      <br />
      <Link to="/explore/accounts">Export to QuickBooks</Link>
      <br />
      <Link to="/explore/accounts">Export to Rotki</Link>
      <hr />
      <div style={{ fontSize: '16pt', fontWeight: '600', fontVariant: 'small-caps' }}>pay features</div>
      <Link to="/explore/accounts">Analytics</Link>
      <br />
      <Link to="/explore/accounts">Charting</Link>
      <br />
      <Link to="/explore/accounts">Accounting</Link>
      <br />
      <Link to="/explore/accounts">Auditing</Link>
    </div>
  );
}

//----------------------------------------------------------------------
Body.propTypes = {
  title: PropTypes.string,
  theFields: PropTypes.array.isRequired
};

//----------------------------------------------------------------------
export default Body;
