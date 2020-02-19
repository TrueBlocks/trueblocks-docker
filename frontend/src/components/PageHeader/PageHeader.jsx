//------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';

/**
 * The main header of the entire app
 * @param {string} logo - url pointing to a local image file displaying the app's logo
 * @param {string} title - the application's title
 */
function PageHeader({ logo, title }) {
  return (
    <div className="page-header">
      <img className="logo" alt={logo} src={logo} />
      <div className="title app">{title}</div>
      <div></div>
    </div>
  );
}

//------------------------------------------------------------
PageHeader.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

//------------------------------------------------------------
export default PageHeader;
