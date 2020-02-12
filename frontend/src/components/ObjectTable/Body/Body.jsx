//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Row from './Row';
import '../ObjectTable.css';

//----------------------------------------------------------------------
function Body({ theFields, object, side, right }) {
  if (!theFields || theFields.length === 0) {
    return <div>No field list</div>;
  }
  return (
    <div className={side ? 'ot_tbody' : 'ot_body_1'}>
      <div className="ot_data">
        {theFields.map((field, index) => {
          return <Row object={object} field={field} index={index} right={right} />;
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
      <br />
      <Link to={'/explore/accounts/export+addrs=' + address + '&occurrence=0&all_abis&articulate'}>Explore</Link>
      <br />
      <Link to="/explore/accounts">Charts</Link>
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
