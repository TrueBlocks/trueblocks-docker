//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import '../ObjectTable.css';

//----------------------------------------------------------------------
function Header({ title, icons, headerEar }) {
  return (
    <div className="ot_thead">
      <div className="ot_th">{title}</div>
      <div className="ot_th" style={{ textAlign: 'right', color: 'white', fontWeight: '600' }}>
        <Icon icon="keyboard_arrow_left" onClick={() => headerEar('previous')} />
        <Icon icon="keyboard_arrow_right" onClick={() => headerEar('next')} />
      </div>
    </div>
  );
}

//----------------------------------------------------------------------
Header.propTypes = {
  title: PropTypes.string
};

//----------------------------------------------------------------------
export default Header;
