import React from 'react';

function BreadCrumb({ page, menu }) {
  var text = menu ? page + ' : ' + menu.subpage.replace('_', ' ') : page;
  return <div className="title inner-page">{text}</div>;
}

export default BreadCrumb;
