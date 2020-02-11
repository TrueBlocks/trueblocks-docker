//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Row from './Row';
import '../ObjectTable.css';

//----------------------------------------------------------------------
function Body({ theFields, object }) {
  if (!theFields || theFields.length === 0) {
    return <div>No field list</div>;
  }
  return (
    <Fragment>
      <div className="ot_tbody">
        <div className="ot_data">
          {theFields.map((field, index) => {
            return <Row object={object} field={field} index={index} />;
          })}
        </div>
        <div className="ot_chart">
          <Link to="/support/about_us/+about_us">Meta</Link>
          <br />
          <Link to={'/explore/accounts/export+addrs=' + object.address}>Explore</Link>
          <br />
          <Link to="/explore/accounts">Charts</Link>
        </div>
      </div>
    </Fragment>
  );
}

//----------------------------------------------------------------------
Body.propTypes = {
  title: PropTypes.string,
  theFields: PropTypes.array.isRequired
};

//----------------------------------------------------------------------
export default Body;
