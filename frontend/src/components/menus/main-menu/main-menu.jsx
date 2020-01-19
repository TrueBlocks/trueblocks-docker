import React from 'react';
import { connect } from 'react-redux';
import MainMenuItem from './main-menu-item';
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

function getInitialActiveMenuIndex(pathname, menus) {
  const pageToMatch = pathname.replace(/^\/([^\/]+).*/, '$1');
  console.log(pageToMatch);
  return menus.findIndex(menu => menu.page === pageToMatch);
}

export class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainMenu: props.mainMenu,
      activeMenuIndex: getInitialActiveMenuIndex(props.location.pathname, props.mainMenu),
      activeSubMenuIndex: undefined
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

  onMenuClick = ({ menuId, subMenuId }) => {
    this.setState({
      activeMenuIndex: menuId,
      activeSubMenuIndex: subMenuId
    });
  };

  render = () => {
    return (
      <div className="left-body-container">
        {this.state.mainMenu.map((menu, index) => {
          const active = index === this.state.activeMenuIndex;
          const activeSubMenuIndex = active ? this.state.activeSubMenuIndex : undefined;

          return (
            <MainMenuItem
              id={index}
              key={index}
              page={menu.page}
              active={active}
              activeSubMenuIndex={activeSubMenuIndex}
              items={menu.items}
              currentPathname={this.props.location.pathname}
              onMenuClick={this.onMenuClick}
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
