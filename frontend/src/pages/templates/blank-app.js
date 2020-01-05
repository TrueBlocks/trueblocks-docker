import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import logo from './img/logo.png';

[{IMPORTS}]
const App = () => (
  <div>
    <header>
      <img className="logo" alt={logo} src={logo} />
[{NAVLINKS}]    </header>

    <main>
[{ROUTES}]    </main>

    <footer>This is the footer of the application and includes email contact, phone numbers, etc.</footer>
  </div>
);

export default App;
