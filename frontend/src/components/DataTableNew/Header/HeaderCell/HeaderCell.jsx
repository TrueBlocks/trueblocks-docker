//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';

//---------------------------------------------------------------------
function HeaderCell({ content, ear }) {
  return <th onClick={() => ear('sort', content)}>{content}</th>;
}

//---------------------------------------------------------------------
HeaderCell.propTypes = {
  content: PropTypes.string.isRequired,
  ear: PropTypes.func.isRequired
};

//---------------------------------------------------------------------
export default HeaderCell;
