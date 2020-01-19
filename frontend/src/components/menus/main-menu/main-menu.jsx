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

export class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainMenu: props.mainMenu
        .map(menu => markAsActiveIfMatchesLocation(props.location.pathname, menu))
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
              currentPathname={this.props.location.pathname}
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
