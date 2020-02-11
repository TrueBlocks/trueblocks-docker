//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import { fmtInteger } from 'utils';
import '../../../ObjectTable.css';

//----------------------------------------------------------------------
function Cell({ value, type, cn }) {
  if (type) {
    if (type.includes('number')) return <div className={cn}>{fmtInteger(value)}</div>;
    else if (type.includes('timestamp')) return <div className={cn}>{value + ' time'}</div>;
  }
  return <div className={cn}>{typeof value === 'object' ? JSON.stringify(value) : value}</div>;
}

//----------------------------------------------------------------------
Cell.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  cn: PropTypes.string.isRequired
};

//----------------------------------------------------------------------
export default Cell;
