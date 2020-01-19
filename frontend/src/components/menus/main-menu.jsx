import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '../icon';
import './main-menu.css';

//------------------------------------------------------------
function markAsActiveIfMatchesLocation(pathname, menu) {
  const { page } = menu;
  const pageRegExp = new RegExp(`^/${page}`);
  const rootRouteDisplayed = pathname === '/' && page === 'dashboard';

  if (!pageRegExp.test(pathname) && !rootRouteDisplayed) return {...menu, active: false};

  return {
    ...menu,
    active: true
  };
}

export class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainMenu: props.mainMenu.map(menu => markAsActiveIfMatchesLocation(props.location.pathname, menu)),
      location: props.location
    };
  }

  onMainClick = (id) => {
    const mainMenu = this.state.mainMenu
          .map((menu, index) => ({
            ...menu,
            active: index === id
          }));

    this.setState({
      mainMenu
    });
  };

  render = () => {
    return (
      <div className="left-body-container">
        {this.state.mainMenu.map((menu, id) => {
          return (
            <MainMenuItem
              key={id}
              id={id}
              page={menu.page}
              active={menu.active}
              items={menu.items}
              currentPathname={this.state.location.pathname}
              onMainClick={this.onMainClick}
            />
          );
        })}
      </div>
    );
  };
}

const mapStateToProps = ({ router }, ownProps) => ({
  location: router.location,
  mainMenu: ownProps.mainMenu
});

export const ConnectedMainMenu = connect(
  mapStateToProps
)(MainMenu);

//------------------------------------------------------------
class MainMenuItem extends Component {
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
            <div>{hasSub ? chevron(active) : <Fragment></Fragment>}</div>
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

const SubMenuItem = ({ id, item, page, active, onSubClick }) => {
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

//------------------------------------------------------------
const chevron = (active) => {
  return (
    <div>
      <Icon icon={active ? 'keyboard_arrow_down' : 'keyboard_arrow_right'} />
    </div>
  );
};
