import React from 'react';
import { connect } from 'react-redux';
import MenuItem from './menu-item';
import './main-menu.css';

/**
 * Check which main menu matches loaded page and returns its index
 * @param {string} pathname - current pathname
 * @param {Array} menus - array of main menus
 * @return {boolean} Index of main menu
 */
function getInitialActiveMenuIndex(pathname, menus) {
  // RegExp matches everything after the first '/' that is not '/'
  // e.g. /page/subpage -> page
  const pageToMatch = pathname.replace(/^\/([^/]+).*/, '$1');
  return menus.findIndex((menu) => menu.page === pageToMatch);
}

export class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainMenu: props.mainMenu,
      activeMenuIndex: getInitialActiveMenuIndex(props.location.pathname, props.mainMenu)
    };
  }

  onMenuClick = ({ menuId }) => {
    var mainMenu = this.state.mainMenu;
    if (mainMenu[this.state.activeMenuIndex] && this.state.activeMenuIndex !== menuId)
      mainMenu[this.state.activeMenuIndex].expanded = false;
    mainMenu[menuId].expanded = !mainMenu[menuId].expanded;
    this.setState({
      mainMenu: mainMenu,
      activeMenuIndex: menuId
    });
  };

  render = () => {
    return (
      <div className="left-body-container">
        {this.state.mainMenu.map((menu, index) => {
          return (
            <MenuItem
              id={index}
              key={index}
              page={menu.page}
              active={menu.expanded}
              items={menu.items}
              currentPathname={this.props.location.pathname}
              onClick={this.onMenuClick}
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

export const ConnectedMainMenu = connect(mapStateToProps)(MainMenu);
