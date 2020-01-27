import React from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { dashboard_menu } from './pages/dashboard';
import { addresses_menu } from './pages/addresses';
import { explore_menu } from './pages/explore';
import { indicies_menu } from './pages/indicies';
import { signatures_menu } from './pages/signatures';
import { caches_menu } from './pages/caches';
import { other_menu } from './pages/other';
import { settings_menu } from './pages/settings';
import { support_menu } from './pages/support';

import { STATUS_TOGGLE, HELP_TOGGLE } from './components/SidePanel/reducers';
import { MAIN_MENU_TOGGLE } from './components/MainMenu/reducers';
import { MainMenu, StatusPanel, HelpPanel, PageHelp } from './components';
import Routes from './routes';
import './Content.css';

const mainMenu = [
  dashboard_menu,
  addresses_menu,
  explore_menu,
  indicies_menu,
  signatures_menu,
  caches_menu,
  other_menu,
  settings_menu,
  support_menu
];

const toggleStatus = () => ({ type: STATUS_TOGGLE });
const toggleHelp = () => ({ type: HELP_TOGGLE });
const toggleMainMenu = () => ({ type: MAIN_MENU_TOGGLE });

export function Content(props) {
  const { isStatusExpanded, isHelpExpanded, isMainMenuExpanded, toggleStatus, toggleHelp, toggleMainMenu } = props;

  const classNames = [
    'app-content',
    isMainMenuExpanded ? 'menu-expanded' : '',
    isStatusExpanded ? 'status-expanded' : '',
    isHelpExpanded ? 'help-expanded' : ''
  ].join(' ');

  return (
    <div className={classNames}>
      <MainMenu mainMenu={mainMenu} isExpanded={isMainMenuExpanded} toggle={toggleMainMenu} />
      <StatusPanel isExpanded={isStatusExpanded} toggle={toggleStatus} />
      <main>
        {Routes.map((route, index) => (
          <Route key={index} render={route.component} exact={route.exact} path={route.path} />
        ))}
      </main>
      <HelpPanel isExpanded={isHelpExpanded} toggle={toggleHelp}>
        <PageHelp />
      </HelpPanel>
    </div>
  );
}

const mapStateToProps = ({ reducer_SidePanels, reducer_MainMenu }) => ({
  isStatusExpanded: reducer_SidePanels.isStatusExpanded,
  isHelpExpanded: reducer_SidePanels.isHelpExpanded,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
