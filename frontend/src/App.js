import React from 'react';
import { Route } from 'react-router-dom';
import { Icon, MainMenu, PageHeader, PageFooter } from './components';
import './App.css';

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
      <PageHeader />
      <Body />
      <PageFooter />
    </div>
  );
}

//------------------------------------------------------------
class Body extends React.Component {
  render = () => {
    return (
      <div className="body-item">
        <MainMenu mainMenu={mainMenu} />
        <div className="right-body-container">
          <Route component={Dashboard} exact path="/" />
          <Route component={Addresses} path="/addresses/:subpage?/:query?" />
          <Route component={Explore} path="/explore/:subpage?/:query?" />
          <Route component={Indicies} path="/indicies/:subpage?/:query?" />
          <Route component={Signatures} path="/signatures/:subpage?/:query?" />
          <Route component={Caches} path="/caches/:subpage?/:query?" />
          <Route component={Other} path="/other/:subpage?/:query?" />
          <Route component={Settings} path="/settings/:subpage?/:query?" />
          <Route component={Support} path="/support/:subpage?/:query?" />
          <Route component={Dashboard} path="/dashboard/:subpage/:query?" />
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
