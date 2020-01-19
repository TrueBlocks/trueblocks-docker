import React from 'react';
import { connect } from 'react-redux';
import MainMenuItem from './main-menu-item';
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
    this.setState({
      activeMenuIndex: menuId
    });
  };

  render = () => {
    return (
      <div className="left-body-container">
        {this.state.mainMenu.map((menu, index) => {
          const active = index === this.state.activeMenuIndex;

          return (
            <MainMenuItem
              id={index}
              key={index}
              page={menu.page}
              active={active}
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

/*
import React from 'react';
import './main-menu.css';
export class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainMenu: props.mainMenu
    };
  }

  onMainClick = (id) => {
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
              onMainClick={this.onMainClick}
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
      items: props.items
    };
  }

  onClick = () => {
    this.props.onMainClick(this.props.id);
  };

  onSubClick = (id) => {
    var items = this.state.items;
    items.map((item) => {
      item.active = item.subpage === items[id].subpage;
      return true;
    });
    this.setState({ items: items });
  };

  render = () => {
    var hasSub = this.props.items && this.props.items.length > 0;
    return (
      <Fragment>
        <Link
          className="menu-item"
          exact={hasSub ? 'false' : 'true'}
          onClick={this.onClick}
          to={'/' + (hasSub ? this.props.page.toLowerCase() : '')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{this.props.page}</div>
            <div>{hasSub ? chevron(this.props.active) : <Fragment></Fragment>}</div>
          </div>
        </Link>
        {this.getSubmenu()}
      </Fragment>
    );
  };

  // { subpage: 'accounts', route: 'status', query: 'modes=monitors&details&ether' },
  getSubmenu = () => {
    if (!this.props.active || !this.props.items) return <Fragment></Fragment>;
    return (
      <div className="submenu-container">
        {this.props.items.map((item, id) => {
          if (item.subpage.includes('-')) return <Fragment key={id}></Fragment>;
          //console.log(item);
          return (
            <SubMenuItem
              key={id}
              id={id}
              page={this.props.page}
              item={item}
              active={this.state.items[id].active}
              onSubClick={this.onSubClick}
            />
          );
        })}
      </div>
    );
  };
}

//------------------------------------------------------------
class SubMenuItem extends Component {
  onClick = () => {
    this.props.onSubClick(this.props.id);
  };

  render = () => {
    var p = this.props;
    var i = this.props.item;
    var to = '/' + p.page + '/' + i.subpage.replace(' ', '_') + '/' + i.route + '+' + i.query;
    var s = this.props.active ? { borderRight: '2px black dotted', backgroundColor: 'salmon' } : {};
    return (
      <Link
        className={'submenu-item' + (this.props.active ? ' is-active' : '')}
        style={s}
        to={to}
        onClick={this.onClick}
      >
        {i.subpage}
      </Link>
    );
  };
}
*/
