import React from 'react';
import PropTypes from 'prop-types';

function BreadCrumb({ page, menu }) {
  var text = menu ? page + ' : ' + menu.subpage.replace('_', ' ') : page;
  return <div className="title">{text}</div>;
}

BreadCrumb.propTypes = {
  page: PropTypes.string.isRequired,
  menu: PropTypes.object
};

export default BreadCrumb;
