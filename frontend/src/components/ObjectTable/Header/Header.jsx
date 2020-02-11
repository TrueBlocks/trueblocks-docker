//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import '../ObjectTable.css';

//----------------------------------------------------------------------
function Header({ title }) {
  return (
    <div className="ot_thead">
      <div className="ot_th">{title}</div>
    </div>
  );
}

//----------------------------------------------------------------------
Header.propTypes = {
  title: PropTypes.string
};

//----------------------------------------------------------------------
export default Header;
