import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import logo from './img/logo.png';

import Dashboard from './a_dashboard-page';
import Addresses from './a_addresses-page';
import Signatures from './a_signatures-page';
import Indcies from './a_indicies-page';
import Caches from './caches-page';
import Other from './other-page';
import Explorer from './explorer-page';
import Settings from './settings-page';
import About from './about-page';
import Support from './support-page';

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
      <NavLink activeClassName="is-active" to="/signatures">
        Signatures
      </NavLink>
      <NavLink activeClassName="is-active" to="/indicies">
        Indcies
      </NavLink>
      <NavLink activeClassName="is-active" to="/caches">
        Caches
      </NavLink>
      <NavLink activeClassName="is-active" to="/other">
        Other
      </NavLink>
      <NavLink activeClassName="is-active" to="/explorer">
        Explorer
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
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/addresses" component={Addresses} />
      <Route exact path="/signatures" component={Signatures} />
      <Route exact path="/indicies" component={Indcies} />
      <Route exact path="/caches" component={Caches} />
      <Route exact path="/other" component={Other} />
      <Route exact path="/explorer" component={Explorer} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/support" component={Support} />
      <Route exact path="/about" component={About} />
    </main>

    <footer>XXX</footer>
  </div>
);

export default App;
