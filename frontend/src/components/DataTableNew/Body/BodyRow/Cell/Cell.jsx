//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';

//---------------------------------------------------------------------
function Cell({ content, expandClicked, deleted, align }) {
  return <td style={{ textAlign: align }}>{content}</td>;
}

//----------------------------------------------------------------------
Cell.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

//----------------------------------------------------------------------
export default Cell;
