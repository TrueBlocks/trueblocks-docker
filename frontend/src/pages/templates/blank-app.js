import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { history } from './store';
import { SET as SET_LAST_LOCATION } from './last-location-actions';
import { MainMenu, PageHeader, PageFooter } from './components';
import './App.css';

//------------------------------------------------------------
[{IMPORTS}]
//------------------------------------------------------------
const setLastLocation = (lastLocation) => ({ type: SET_LAST_LOCATION, lastLocation });

function App({ lastLocation, setLastLocation, currentLocation }) {
  if (lastLocation && currentLocation.pathname === '/') {
    setLastLocation(null);
    return <Redirect to={lastLocation} />;
  }

  history.listen(({ pathname, search, hash }) => {
    setLastLocation({ pathname, search, hash });
  });

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
[{ROUTES}]          <Route component={Dashboard} path="/dashboard/:subpage/:query?" />
        </div>
      </div>
    );
  };
}

//------------------------------------------------------------
var mainMenu = [];
[{NAVLINKS}]

const mapStateToProps = ({ reducer_LastLocation, router }) => ({
  lastLocation: reducer_LastLocation.lastLocation,
  currentLocation: router.location
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setLastLocation
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
