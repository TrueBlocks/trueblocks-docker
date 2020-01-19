import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import SubMenuItem from './submenu-item';
import Chevron from './chevron';

export default function MainMenuItem({ id, active: mainMenuActive, page, items, onClick }) {
  const submenuPresent = items && items.length > 0;
  const toLocation = '/' + (submenuPresent ? page.toLowerCase() : '');
  const onThisMenuClick = onClick.bind(null, { menuId: id });

  const submenu = (() => {
    if(!submenuPresent || !mainMenuActive) return null;

    return items.map((item, index) => {
      if (item.subpage.includes('-')) return null;

      return (
        <SubMenuItem
          key={index}
          page={page}
          item={item}
          onClick={onThisMenuClick}
          />
      );
    });
  })();

  return (
    <Fragment>
      <NavLink
        className="menu-item"
        activeClassName="is-active"
        exact={!submenuPresent}
        onClick={onThisMenuClick}
        to={toLocation}
        >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{page}</div>
          <div>{submenuPresent ? <Chevron active={mainMenuActive} /> : <Fragment></Fragment>}</div>
        </div>
      </NavLink>
      {submenu}
    </Fragment>
  );
}
