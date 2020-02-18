import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import SubmenuItem from './SubmenuItem';
import Icon from 'components/Icon';

function MenuItem({ id, active: mainMenuActive, collapsed, page, items, onClick, toggle }) {
  const hasSubMenu = items && items.length > 0;
  const toLocation = '/' + (hasSubMenu ? page.toLowerCase() : '');
  const onThisMenuClick = onClick.bind(null, { menuId: id });

  const collapseAll = (event) => {
    event.stopPropagation();
    event.preventDefault();
    toggle();
  };

  const thisMenu = (() => {
    return (
      <Fragment>
        {collapsed ? null : <span>{page}</span>}
        {hasSubMenu ? (
          <Icon title={page} icon={mainMenuActive ? 'keyboard_arrow_down' : 'keyboard_arrow_right'} />
        ) : (
          <Icon title={page} icon={collapsed ? 'keyboard_arrow_right' : 'keyboard_arrow_left'} onClick={collapseAll} />
        )}
      </Fragment>
    );
  })();

  const subMenu = (() => {
    if (!hasSubMenu || !mainMenuActive) return null;
    return items.map((item, index) => {
      if (item.subpage.includes('-') || item.subpage === 'dashboard') return null;
      return <SubmenuItem key={index} page={page} item={item} collapsed={collapsed} />;
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
        {thisMenu}
      </NavLink>
      {subMenu}
    </Fragment>
  );
}

export default MenuItem;
