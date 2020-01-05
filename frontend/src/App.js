import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import logo from './img/logo.png';

import Dashboard from './pages/dashboard';
import Addresses from './pages/addresses';
import Explore from './pages/explore';
import Indicies from './pages/indicies';
import Signatures from './pages/signatures';
import Caches from './pages/caches';
import Other from './pages/other';
import Settings from './pages/settings';
import Support from './pages/support';

const App = () => (
//  var whole_page = {
//    margin: '10px',
//    padding: '10px',
//    border: '1px red dashed',
//    display: 'flex',
//    'grid-template-columns': '1fr 11fr',
//    backgroundImage: 'url(http://localhost/images/whole_page.png)'
//  };
//  var menu = {
//    'background-color': 'blue',
//    border: '1px red dashed',
//    display: 'flex',
//    'flex-flow': 'column nowrap',
//    width: '100%',
//    margin: '10px',
//    padding: '10px'
//  };
//  var body = {
//    'background-color': 'green',
//    border: '1px red dashed',
//    width: '100%',
//    'text-color': 'white',
//    margin: '10px',
//    padding: '10px'
//  };
//  return (
//    <Fragment>
//      <div style={whole_page}>
//        <div style={menu}>
//          <NavLink activeClassName="is-active" exact to="/">
//            Dashboard
//          </NavLink>
//          <NavLink activeClassName="is-active" exact to="/">
//            Dashboard
//          </NavLink>
//          <NavLink activeClassName="is-active" exact to="/">
//            Dashboard
//          </NavLink>
//        </div>
//        <div style={body}>X</div>
//      </div>
//    </Fragment>
//  );
  <div>
    <header>
      <img className="logo" alt={logo} src={logo} />
      <NavLink activeClassName="is-active" exact={true} to="/">
        Dashboard
      </NavLink>
      <NavLink activeClassName="is-active" to="/addresses">
        Addresses
      </NavLink>
      <NavLink activeClassName="is-active" to="/explore">
        Explore
      </NavLink>
      <NavLink activeClassName="is-active" to="/indicies">
        Indicies
      </NavLink>
      <NavLink activeClassName="is-active" to="/signatures">
        Signatures
      </NavLink>
      <NavLink activeClassName="is-active" to="/caches">
        Caches
      </NavLink>
      <NavLink activeClassName="is-active" to="/other">
        Other
      </NavLink>
      <NavLink activeClassName="is-active" to="/settings">
        Settings
      </NavLink>
      <NavLink activeClassName="is-active" to="/support">
        Support
      </NavLink>
    </header>

    <main>
      <Route exact path="/" component={Dashboard} />
      <Route path="/addresses/:subpage?" component={Addresses} />
      <Route path="/explore/:subpage?" component={Explore} />
      <Route path="/indicies/:subpage?" component={Indicies} />
      <Route path="/signatures/:subpage?" component={Signatures} />
      <Route path="/caches/:subpage?" component={Caches} />
      <Route path="/other/:subpage?" component={Other} />
      <Route path="/settings/:subpage?" component={Settings} />
      <Route path="/support/:subpage?" component={Support} />
    </main>

    <footer>This is the footer of the application and includes email contact, phone numbers, etc.</footer>
  </div>
);

export default App;
