import React, { Component, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Icon } from './icon';
import './mainmenu.css';

//------------------------------------------------------------
export class MainMenu extends React.Component {
  render = () => {
    return (
      <div className="left-body-container">
        {this.props.mainMenu.map((menu, id) => {
          return (
            <MainMenuItem
              key={id}
              page={menu.page}
              active={menu.active}
              submenu={menu.submenu}
              dispatcher={menu.dispatcher}
            />
          );
        })}
      </div>
    );
  };
}

//------------------------------------------------------------
class MainMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active
    };
  }

  mainClick = () => {
    this.setState({ active: !this.state.active });
  };

  getSubmenu = () => {
    if (!this.state.active || !this.props.submenu) return <Fragment></Fragment>;
    return (
      <div className="submenu-container">
        {this.props.submenu.map((sub) => {
          return <SubMenuItem key={sub} menu_text={sub.menu_text} active={sub.active} />;
        })}
      </div>
    );
  };

  render = () => {
    var hasSub = this.props.submenu && this.props.submenu.length > 0;
    return (
      <Fragment>
        <NavLink
          className="menu-item"
          activeClassName="is-active"
          exact={hasSub ? true : false}
          to={!hasSub ? '/' : '/' + this.props.page.toLowerCase()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }} onClick={this.mainClick}>
            <div>{this.props.page}</div>
            <div>{chevron(this.props.page, this.state.active)}</div>
          </div>
        </NavLink>
        {this.getSubmenu()}
      </Fragment>
    );
  };
}

//------------------------------------------------------------
class SubMenuItem extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    if (this.props.menu_text.includes('-')) return <Fragment></Fragment>;
    return (
      <NavLink className={'submenu-item' + (this.props.active === true ? ' is-axctive' : '')} to={'/'}>
        <div>{this.props.menu_text}</div>
      </NavLink>
    );
  };
}

//------------------------------------------------------------
const chevron = (page, active) => {
  if (page === 'Dashboard') return <Fragment></Fragment>;
  return (
    <div>
      <Icon icon={active ? 'keyboard_arrow_down' : 'keyboard_arrow_right'} />
    </div>
  );
};
