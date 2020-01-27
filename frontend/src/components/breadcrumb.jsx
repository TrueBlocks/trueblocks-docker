import React from 'react';

export function BreadCrumb({ page, menu }) {
  var text = menu ? page + ' : ' + menu.subpage.replace('_', ' ') : page;
  return <div className="title inner-page">{text}</div>;
}
