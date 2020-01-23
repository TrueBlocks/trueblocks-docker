import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import SubMenuItem from './submenu-item';
import Chevron from './chevron';

export default function MenuItem({ id, active: mainMenuActive, page, items, onClick }) {
  const hasSubMenu = items && items.length > 0;
  const toLocation = '/' + (hasSubMenu ? page.toLowerCase() : '');
  const onThisMenuClick = onClick.bind(null, { menuId: id });

  const subMenu = (() => {
    if (!hasSubMenu || !mainMenuActive) return null;
    return items.map((item, index) => {
      if (item.subpage.includes('-') || item.subpage === 'dashboard') return null;
      return <SubMenuItem key={index} page={page} item={item} />;
    });
  })();

  return (
    <Fragment>
      <NavLink
        className="menu-item"
        activeClassName="is-active"
        exact={!hasSubMenu}
        onClick={onThisMenuClick}
        to={toLocation}
      >
        <span>{page}</span>
        {hasSubMenu ? <Chevron active={mainMenuActive} /> : null}
      </NavLink>
      {subMenu}
    </Fragment>
  );
}
