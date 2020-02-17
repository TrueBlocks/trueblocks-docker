import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import SubmenuItem from './SubmenuItem';
import Icon from 'components/Icon';

function MenuItem({ id, active: mainMenuActive, collapsed, page, items, onClick, toggle }) {
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

  const collapseAll = (event) => {
    event.stopPropagation();
    event.preventDefault();
    toggle();
  };

  return (
    <Fragment>
      <NavLink
        className="menu-item"
        activeClassName="is-active"
        exact={!hasSubMenu}
        onClick={onThisMenuClick}
        to={toLocation}
      >
        {collapsed ? null : <span>{page}</span>}
        {hasSubMenu ? (
          <Icon icon={mainMenuActive ? 'keyboard_arrow_down' : 'keyboard_arrow_right'} />
        ) : (
          <Icon icon="keyboard_arrow_left" onClick={collapseAll} />
        )}
      </NavLink>
      {subMenu}
    </Fragment>
  );
}

export default MenuItem;
