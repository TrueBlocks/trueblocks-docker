//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import '../ObjectTable.css';

//----------------------------------------------------------------------
function Header({ title, showNav, headerEar }) {
  return (
    <div className="ot_thead">
      <div className="ot_th">{title}</div>
      <div
        className="ot_th"
        style={{ textAlign: 'right', color: 'white', fontWeight: '600', borderRight: '1px solid' }}
      >
        {getNavigation(showNav, headerEar)}
      </div>
      <div className="ot_th"></div>
    </div>
  );
}

//----------------------------------------------------------------------
function getNavigation(showing, headerEar) {
  return showing ? (
    <Fragment>
      {' '}
      <Icon icon="first_page" onClick={() => headerEar('first')} />
      <Icon icon="navigate_before" onClick={() => headerEar('previous')} />
      <Icon icon="navigate_next" onClick={() => headerEar('next')} />
      <Icon icon="last_page" onClick={() => headerEar('latest')} />
    </Fragment>
  ) : (
    <Fragment></Fragment>
  );
}

//----------------------------------------------------------------------
Header.propTypes = {
  title: PropTypes.string
};

//----------------------------------------------------------------------
export default Header;
