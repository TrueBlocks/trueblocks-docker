import React from 'react';
import { connect } from 'react-redux';
import { ExpandShrinkIcon } from '../';
import MenuItem from './MenuItem';
import './MainMenu.css';

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

class MainMenu extends React.Component {
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
    const { isExpanded } = this.props;
    const className = ['left-body-container', isExpanded ? 'expanded' : ''].join(' ');

    return (
      <div className={className}>
        <button className="toggle-button" onClick={this.props.toggle}>
          <ExpandShrinkIcon shrinkTo="left" isExpanded={isExpanded} />
        </button>
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

const mapStateToProps = ({ router, reducer_MainMenu }, ownProps) => ({
  location: router.location,
  mainMenu: ownProps.mainMenu,
  isExpanded: ownProps.isExpanded,
  toggle: ownProps.toggle
});

export const ConnectedMainMenu = connect(mapStateToProps)(MainMenu);
