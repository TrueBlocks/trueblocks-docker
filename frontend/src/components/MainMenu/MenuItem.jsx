import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import SubmenuItem from './SubmenuItem';
import Chevron from './Chevron';

function MenuItem({ id, active: mainMenuActive, page, items, onClick, ...props }) {
  const hasSubMenu = items && items.length > 0;
  const toLocation = '/' + (hasSubMenu ? page.toLowerCase() : '');
  const onThisMenuClick = onClick.bind(null, { menuId: id });

  const subMenu = (() => {
    if (!hasSubMenu || !mainMenuActive) return null;
    return items.map((item, index) => {
      if (item.subpage.includes('-') || item.subpage === 'dashboard') return null;
      return <SubmenuItem key={index} page={page} item={item} />;
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
        {props.children}
        {hasSubMenu ? <Chevron active={mainMenuActive} /> : null}
      </NavLink>
      {subMenu}
    </Fragment>
  );
}

export default MenuItem;
