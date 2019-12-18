import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import logo from './img/logo.png';

import Dashboard from './pages/dashboard';
import Addresses from './pages/addresses';
import Explorer from './pages/explorer';
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
      <NavLink activeClassName="is-active" to="/explorer">
        Explorer
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
      <Route exact path="/addresses" component={Addresses} />
      <Route exact path="/explorer" component={Explorer} />
      <Route exact path="/indicies" component={Indcies} />
      <Route exact path="/signatures" component={Signatures} />
      <Route exact path="/caches" component={Caches} />
      <Route exact path="/other" component={Other} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/support" component={Support} />
      <Route exact path="/about" component={About} />
    </main>

    <footer>This is the footer of the application and includes email contact, phone numbers, etc.</footer>
  </div>
);

export default App;
