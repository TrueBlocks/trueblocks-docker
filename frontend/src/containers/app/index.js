import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Documentation from '../documentation'
import Settings from '../settings'
import logo from '../../img/logo.png'

const App = () => (
  <div>
    <header>
      <img src={logo} height="75px"/>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/docs">Documentation</Link>
      <Link to="/settings">Settings</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/docs" component={Documentation} />
      <Route exact path="/settings" component={Settings} />
    </main>
  </div>
)

export default App
