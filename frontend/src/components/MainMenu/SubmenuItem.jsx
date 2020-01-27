import React from 'react';
import { NavLink } from 'react-router-dom';

function SubmenuItem({ item, page, onClick }) {
  const to = `/${page}/${item.subpage.replace(' ', '_')}/${item.route}+${item.query}`;
  return (
    <NavLink className="submenu-item" activeClassName="is-active" to={to}>
      {item.subpage}
    </NavLink>
  );
}

export default SubmenuItem;
