//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isHex, isNumber, fmtInteger } from 'utils';
import '../../../DataTable.css';

//----------------------------------------------------------------------
function Cell({ content, align, showing, cellEar }) {
  if (!showing) return <Fragment></Fragment>;
  var val = content;
  var isNum = !isHex(content) && isNumber(content) && !content.toString().includes('.');
  return (
    <div
      style={{ textAlign: align }}
      className={'dt_td' + (isNum ? ' number' : '')}
      onClick={() => cellEar('expand', '')}
    >
      {isNum ? fmtInteger(val) : val}
    </div>
  );
}

//----------------------------------------------------------------------
Cell.propTypes = {
  content: PropTypes.any
};

//----------------------------------------------------------------------
export default Cell;
