import React from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { dashboard_menu } from './pages/dashboard';
import { monitors_menu } from './pages/monitors';
import { names_menu } from './pages/names';
import { explore_menu } from './pages/explore';
import { digests_menu } from './pages/digests';
import { caches_menu } from './pages/caches';
import { settings_menu } from './pages/settings';
import { support_menu } from './pages/support';
import { addresses_menu } from './pages/addresses';

import { STATUS_TOGGLE, HELP_TOGGLE } from './components/PanelBase/reducers';
import { MAIN_MENU_TOGGLE } from './components/MainMenu/reducers';
import { MainMenu, Separator, PanelStatus, PanelHelp } from './components';
import { HelpText } from './help';
import Routes from './routes';

const mainMenu = [
  dashboard_menu,
  monitors_menu,
  names_menu,
  explore_menu,
  digests_menu,
  caches_menu,
  settings_menu,
  support_menu,
  Separator,
  addresses_menu
];

const toggleStatus = () => ({ type: STATUS_TOGGLE });
const toggleHelp = () => ({ type: HELP_TOGGLE });
const toggleMainMenu = () => ({ type: MAIN_MENU_TOGGLE });

export function Content(props) {
  const {
    location,
    isStatusExpanded,
    isHelpExpanded,
    isMainMenuExpanded,
    toggleStatus,
    toggleHelp,
    toggleMainMenu
  } = props;

  const classNames = [
    'page-body',
    isMainMenuExpanded ? 'menu-expanded' : '',
    isStatusExpanded ? 'status-expanded' : '',
    isHelpExpanded ? 'help-expanded' : ''
  ].join(' ');

  return (
    <div className={classNames}>
      <MainMenu mainMenu={mainMenu} isExpanded={isMainMenuExpanded} toggle={toggleMainMenu} />
      <PanelStatus isExpanded={isStatusExpanded} toggle={toggleStatus} />
      <main>
        {Routes.map((route, index) => (
          <Route key={index} render={route.component} exact={route.exact} path={route.path} />
        ))}
      </main>
      <PanelHelp isExpanded={isHelpExpanded} toggle={toggleHelp}>
        <HelpText location={location} />
      </PanelHelp>
    </div>
  );
}

const mapStateToProps = ({ router, reducer_Panels, reducer_MainMenu }) => ({
  location: router.location,
  isStatusExpanded: reducer_Panels.isStatusExpanded,
  isHelpExpanded: reducer_Panels.isHelpExpanded,
  isMainMenuExpanded: reducer_MainMenu.isMainMenuExpanded
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      toggleStatus,
      toggleHelp,
      toggleMainMenu
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Content);
