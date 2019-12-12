import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import logo from './z_img/logo.png';

import AddressIndex from './a_addresses-page';
import Monitors from './a_monitors-page';
import Names from './a_names-page';
import Explorer from './explorer-page';
import Caches from './caches-page';
import Settings from './a_settings-page';
import About from './z_about-page';
import Support from './z_support-page';

const App = () => (
  <div>
    <header>
      <img className="logo" alt={logo} src={logo} />
      <NavLink activeClassName="is-active" exact={true} to="/">
        Home
      </NavLink>
      <NavLink activeClassName="is-active" to="/monitors">
        Monitors
      </NavLink>
      <NavLink activeClassName="is-active" to="/names">
        Names
      </NavLink>
      <NavLink activeClassName="is-active" to="/explorer">
        Explorer
      </NavLink>
      <NavLink activeClassName="is-active" to="/caches">
        Caches
      </NavLink>
      <NavLink activeClassName="is-active" to="/settings">
        Settings
      </NavLink>
      <NavLink activeClassName="is-active" to="/support">
        Support
      </NavLink>
      <NavLink activeClassName="is-active" to="/about">
        About
      </NavLink>
      <NavLink to="/">{` `}</NavLink>
    </header>

    <main>
      <Route exact path="/" component={AddressIndex} />
      <Route exact path="/monitors" component={Monitors} />
      <Route exact path="/names" component={Names} />
      <Route exact path="/explorer" component={Explorer} />
      <Route exact path="/caches" component={Caches} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/support" component={Support} />
      <Route exact path="/about" component={About} />
    </main>

    <footer>XXX</footer>
  </div>
);

export default App;
