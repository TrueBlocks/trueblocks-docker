import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SubMenuItem({ id, item, page, active, onSubClick }) {
  const to = `/${page}/${item.subpage.replace(' ', '_')}/${item.route}+${item.query}`;
  const onClick = () => onSubClick(id);

  return (
    <NavLink
      className={'submenu-item' + (active ? ' is-active' : '')}
      activeClassName="is-active"
      to={to}
      onClick={onClick}
      >
      {item.subpage}
    </NavLink>
  );
}
