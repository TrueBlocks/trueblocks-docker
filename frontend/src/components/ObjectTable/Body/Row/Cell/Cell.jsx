//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import { fmtInteger } from 'utils';
import '../../../ObjectTable.css';

//----------------------------------------------------------------------
function Cell({ value, type, cn, bold, color }) {
  if (type) {
    if (type.includes('number'))
      return (
        <div className={cn} style={getStyle(bold, color)}>
          {fmtInteger(value)}
        </div>
      );
    else if (type.includes('timestamp'))
      return (
        <div className={cn} style={getStyle(bold, color)}>
          {value}
        </div>
      );
  }
  return (
    <div className={cn} style={getStyle(bold, color)}>
      {typeof value === 'object' ? JSON.stringify(value) : value}
    </div>
  );
}

//----------------------------------------------------------------------
function getStyle(bold, color) {
  if (bold && color) return { fontWeight: '600', color: color };
  else if (color) return { color: color };
  else if (bold) return { fontWeight: '600' };
  return {};
}

//----------------------------------------------------------------------
Cell.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  cn: PropTypes.string.isRequired
};

//----------------------------------------------------------------------
export default Cell;
