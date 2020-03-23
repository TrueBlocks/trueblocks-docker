import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'components';
import './MainMenu.css';

function SubmenuItem({ item, page, collapsed, onClick }) {
  const get = (() => {
    if (item.icon) return <Icon icon={item.icon} title={item.subpage} midsize />;
    return item.subpage.substr(0, 2);
  })();

  const to = `/${page}/${item.subpage.replace(' ', '_')}/${item.route}+${item.query}`;
  return (
    <NavLink className={collapsed ? 'submenu-icon' : 'submenu-item'} activeClassName="is-active" to={to}>
      {collapsed ? get : `${item.subpage}`}
    </NavLink>
  );
}

export default SubmenuItem;
