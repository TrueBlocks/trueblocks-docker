import React from 'react';
import { Route } from 'react-router-dom';
import { Icon, MainMenu, PageHeader, PageFooter } from './components';
import './App.css';

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
