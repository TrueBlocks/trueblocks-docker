import React from 'react';
import { Route } from 'react-router-dom';
import logo from './img/logo.png';
import './App.css';
import { Icon, MainMenu, Footer } from './components';

//------------------------------------------------------------
import Dashboard, { dashboard_menu } from './pages/dashboard';
import Addresses, { addresses_menu } from './pages/addresses';
import Explore, { explore_menu } from './pages/explore';
import Indicies, { indicies_menu } from './pages/indicies';
import Signatures, { signatures_menu } from './pages/signatures';
import Caches, { caches_menu } from './pages/caches';
import Other, { other_menu } from './pages/other';
import Settings, { settings_menu } from './pages/settings';
import Support, { support_menu } from './pages/support';

//------------------------------------------------------------
function App() {
  return (
    <div className="page-container">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

//------------------------------------------------------------
class Header extends React.Component {
  render = () => {
    return (
      <div className="header-item">
        <div className="header-left">
          <img className="logo" alt={logo} src={logo} />
        </div>
        <div className="header-middle">
          <div className="title app">TrueBlocks Account Explorer</div>
        </div>
        <div className="header-right">
          <div style={{ height: '2.8em' }}></div>
          <Icon color="darkblue" midsize icon="help" />
        </div>
      </div>
    );
  };
}

//------------------------------------------------------------
class Body extends React.Component {
  render = () => {
    return (
      <div className="body-item">
        <MainMenu mainMenu={mainMenu} />
        <div className="right-body-container">
          <Route component={Dashboard} exact path="/" />
          <Route component={Addresses} path="/addresses/:subpage?" />
          <Route component={Explore} path="/explore/:subpage?" />
          <Route component={Indicies} path="/indicies/:subpage?" />
          <Route component={Signatures} path="/signatures/:subpage?" />
          <Route component={Caches} path="/caches/:subpage?" />
          <Route component={Other} path="/other/:subpage?" />
          <Route component={Settings} path="/settings/:subpage?" />
          <Route component={Support} path="/support/:subpage?" />
        </div>
      </div>
    );
  };
}

//------------------------------------------------------------
var mainMenu = [];
mainMenu.push(dashboard_menu);
mainMenu.push(addresses_menu);
mainMenu.push(explore_menu);
mainMenu.push(indicies_menu);
mainMenu.push(signatures_menu);
mainMenu.push(caches_menu);
mainMenu.push(other_menu);
mainMenu.push(settings_menu);
mainMenu.push(support_menu);

export default App;
