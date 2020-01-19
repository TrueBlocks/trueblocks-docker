import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SubMenuItem({ item, page, onClick }) {
  const to = `/${page}/${item.subpage.replace(' ', '_')}/${item.route}+${item.query}`;

  return (
    <NavLink
      className="submenu-item"
      activeClassName="is-active"
      to={to}
      onClick={onClick}
      >
      {item.subpage}
    </NavLink>
  );
}
