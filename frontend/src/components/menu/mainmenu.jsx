import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../icon';
import './mainmenu.css';

//------------------------------------------------------------
export class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainMenu: props.mainMenu
    };
  }

  mainClick = (id) => {
    var menu = this.state.mainMenu;
    menu[id].active = !menu[id].active;
    this.setState({ mainMenu: menu });
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
              mainClick={this.mainClick}
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
    //this.setState({ active: !this.state.active });
    this.props.mainClick(this.props.id);
  };

  render = () => {
    var hasSub = this.props.items && this.props.items.length > 0;
    return (
      <Fragment>
        <NavLink
          className="menu-item"
          activeClassName="is-active"
          exact={hasSub ? false : true}
          onClick={this.mainClick}
          to={
            !hasSub
              ? '/'
              : '/' +
                (this.props.page.toLowerCase() + '/' + (this.props.subpage ? this.props.subpage.toLowerCase() : ''))
          }
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{this.props.page}</div>
            <div>{hasSub ? chevron(this.state.active) : <Fragment></Fragment>}</div>
          </div>
        </NavLink>
        {/*this.getSubmenu()*/}
      </Fragment>
    );
  };

  getSubmenu = () => {
    if (!this.state.active || !this.props.items) return <Fragment></Fragment>;
    return (
      <div className="submenu-container">
        {this.props.items.map((item, id) => {
          if (item.subpage.includes('-')) return <Fragment></Fragment>;
          return (
            <SubMenuItem
              key={id}
              active={item.active}
              subpage={item.subpage}
              page={this.props.page}
              route={item.route}
              query={item.query}
            />
          );
        })}
      </div>
    );
  };
}

//------------------------------------------------------------
class SubMenuItem extends Component {
  render = () => {
    var to = '/' + this.props.page + '/' + this.props.subpage + '/' + this.props.route + '-' + this.props.query;
    return (
      <NavLink className="submenu-item" activeClassName="is-active" to={to} exact>
        {this.props.subpage}
      </NavLink>
    );
  };
}

//------------------------------------------------------------
const chevron = (active) => {
  return (
    <div>
      <Icon icon={active ? 'keyboard_arrow_down' : 'keyboard_arrow_right'} />
    </div>
  );
};
