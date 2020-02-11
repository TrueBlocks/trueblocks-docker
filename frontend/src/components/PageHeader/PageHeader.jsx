//------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';

import './PageHeader.css';

//------------------------------------------------------------
function PageHeader({ logo, text }) {
  return (
    <div className="page-header">
      <img className="logo" alt={logo} src={logo} />
      <div className="title app">{text}</div>
      <div></div>
    </div>
  );
}

//------------------------------------------------------------
PageHeader.propTypes = {
  logo: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

//------------------------------------------------------------
export default PageHeader;
