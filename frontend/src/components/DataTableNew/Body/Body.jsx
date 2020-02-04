//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

//---------------------------------------------------------------------
class Body extends React.Component {
  render = () => {
    return (
      <tbody>
        {this.props.rows.map((_row, index) => {
          return <Row key={_row.address} {...this.props} row={_row} />;
        })}
      </tbody>
    );
  };
}

//---------------------------------------------------------------------
Body.propTypes = {
  rows: PropTypes.array.isRequired,
  ear: PropTypes.func.isRequired
};

//---------------------------------------------------------------------
export default Body;
