//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import BodyRow from './BodyRow';

//---------------------------------------------------------------------
class Body extends React.Component {
  onCloseAll = () => {
    this.setState(this.state);
  };

  render = () => {
    return (
      <tbody>
        {this.props.rows.map((_row) => {
          return <BodyRow key={_row.address} {...this.props} row={_row} onCloseAll={this.onCloseAll} />;
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
