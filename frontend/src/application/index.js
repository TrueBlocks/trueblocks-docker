import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import logo from '../img/logo.png';

import Home from '../home';
import Monitors from '../monitors';
import Explorer from '../explorer';
import Scraper from '../scraper';
import Settings from '../settings';
import About from '../about';
import Support from '../support';

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
      <Route exact path="/" component={Home} />
      <Route exact path="/monitors" component={Monitors} />
      <Route exact path="/explorer" component={Explorer} />
      <Route exact path="/scraper" component={Scraper} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/support" component={Support} />
      <Route exact path="/about" component={About} />
    </main>

    <footer>XXX</footer>
  </div>
);

export default App;
