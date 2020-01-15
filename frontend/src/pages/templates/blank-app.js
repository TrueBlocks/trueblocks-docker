import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import { Icon, MainMenu, PageFooter } from './components';

//------------------------------------------------------------
[{IMPORTS}]
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
class PageHeader extends React.Component {
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
[{ROUTES}]        </div>
      </div>
    );
  };
}

//------------------------------------------------------------
var mainMenu = [
[{NAVLINKS}]];

export default App;
