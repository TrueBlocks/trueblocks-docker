import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import logo from '../z_img/logo.png';

import AddressIndexPage from '../a_addresses-page';
import Monitors from '../a_monitors-page';
import Names from '../names-page';
import Explorer from '../explorer-page';
import Scraper from '../scraper-page';
import Settings from '../a_settings-page';
import About from '../z_about-page';
import SupportPage from '../z_support-page';

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
      <NavLink activeClassName="is-active" to="/scraper">
        Scraper
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
      <Route exact path="/" component={AddressIndexPage} />
      <Route exact path="/monitors" component={Monitors} />
      <Route exact path="/names" component={Names} />
      <Route exact path="/explorer" component={Explorer} />
      <Route exact path="/scraper" component={Scraper} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/support" component={SupportPage} />
      <Route exact path="/about" component={About} />
    </main>

    <footer>XXX</footer>
  </div>
);

export default App;
