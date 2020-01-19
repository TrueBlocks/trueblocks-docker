import React, { Component, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SubMenuItem from './submenu-item';
import Chevron from './chevron';

export /*default*/ class XMainMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      page: props.page
    };

    this.state.items = props.items.map(item => ({
      ...item,
      active: this.isSubmenuItemActive(item)
    }));
  }

  onClick = () => {
    this.props.onMainClick(this.state.id);
  };

  onSubClick = (id) => {
    const items = this.state.items;

    this.setState({
      items: items.map((item) => ({
        ...item,
        active: item.subpage === items[id].subpage
      }))
    });
  };

  render = () => {
    const { items, page } = this.state;
    const { active } = this.props;
    const hasSub = items && items.length > 0;

    return (
      <Fragment>
        <NavLink
          className="menu-item"
          activeClassName="is-active"
          exact={hasSub ? false : true}
          onClick={this.onClick}
          to={'/' + (hasSub ? page.toLowerCase() : '')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{page}</div>
            <div>{hasSub ? <Chevron active={active} /> : <Fragment></Fragment>}</div>
          </div>
        </NavLink>
        {this.getSubmenu()}
      </Fragment>
    );
  };

  // Checks if a submenu item is active, based on current route (used to
  // determine active item when site loads)
  isSubmenuItemActive = (item) => {
    const { page } = this.state;
    const { active, currentPathname } = this.props;

    if (!active) return false;

    const routeRegExp = new RegExp(`/${page}.+/${item.subpage}`);

    if (!routeRegExp.test(currentPathname)) return false;

    return true;
  };

  // { subpage: 'accounts', route: 'status', query: 'modes=monitors&details&ether' },
  getSubmenu = () => {
    const { items, page } = this.state;
    const { active } = this.props;

    if (!active || !items) return <Fragment></Fragment>;

    return (
      <div className="submenu-container">
        {items.map((item, id) => {
          if (item.subpage.includes('-')) return <Fragment key={id}></Fragment>;

          return (
            <SubMenuItem
              key={id}
              id={id}
              page={page}
              item={item}
              active={item.active}
              onSubClick={this.onSubClick}
            />
          );
        })}
      </div>
    );
  };
}

export default function MainMenuItem({ id, active, activeSubMenuIndex, page, items, onMenuClick }) {
  const submenuPresent = items && items.length > 0;
  const toLocation = '/' + (submenuPresent ? page.toLowerCase() : '');
  const onSubMenuClick = (subMenuId) => onMenuClick({ menuId: id, subMenuId });

  const submenu = (!submenuPresent || !active) ? null : items.map((item, index) => {
    if (item.subpage.includes('-')) return null;

    const subMenuActive = activeSubMenuIndex === index;

    return (
      <SubMenuItem
        id={index}
        key={index}
        page={page}
        item={item}
        active={subMenuActive}
        onSubClick={onSubMenuClick}
        />
    );
  });

  return (
    <Fragment>
      <NavLink
        className="menu-item"
        activeClassName="is-active"
        exact={!submenuPresent}
        onClick={() => onMenuClick({ menuId: id })}
        to={toLocation}
        >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{page}</div>
          <div>{submenuPresent ? <Chevron active={active} /> : <Fragment></Fragment>}</div>
        </div>
      </NavLink>
      {submenu}
    </Fragment>
  );
}
