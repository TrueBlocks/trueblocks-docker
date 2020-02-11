//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Body from './Body';
import './ObjectTable.css';

//----------------------------------------------------------------------
function ObjectTable({ object, theFields, title, margin = '0%', width = '75%' }) {
  return (
    <div className={'object_table'} style={{ marginLeft: margin, width: width }}>
      <Header title={title} />
      <Body theFields={theFields} object={object} />
    </div>
  );
}

//----------------------------------------------------------------------
ObjectTable.propTypes = {
  object: PropTypes.PropTypes.object.isRequired,
  theFields: PropTypes.PropTypes.array.isRequired
};

//----------------------------------------------------------------------
export default ObjectTable;
