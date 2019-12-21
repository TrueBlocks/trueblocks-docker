import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import logo from './img/logo.png';

import Dashboard from './pages/dashboard';
import Addresses from './pages/addresses';
import Explore from './pages/explore';
import Indcies from './pages/indicies';
import Signatures from './pages/signatures';
import Caches from './pages/caches';
import Other from './pages/other';
import Settings from './pages/settings';
import Support from './pages/support';
import About from './pages/about';

const App = () => (
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
        Indcies
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
      <NavLink activeClassName="is-active" to="/about">
        About
      </NavLink>
    </header>

    <main>
      <Route exact path="/" component={Dashboard} />
      <Route path="/addresses/:subpage?" component={Addresses} />
      <Route path="/explore/:subpage?" component={Explore} />
      <Route path="/indicies/:subpage?" component={Indcies} />
      <Route path="/signatures/:subpage?" component={Signatures} />
      <Route path="/caches/:subpage?" component={Caches} />
      <Route path="/other/:subpage?" component={Other} />
      <Route path="/settings/:subpage?" component={Settings} />
      <Route path="/support/:subpage?" component={Support} />
      <Route path="/about/:subpage?" component={About} />
    </main>

    <footer>This is the footer of the application and includes email contact, phone numbers, etc.</footer>
  </div>
);

export default App;
