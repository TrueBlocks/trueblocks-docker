import React from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import SettingsInner from './inner';
import { dispatcher_Settings, settings_menu } from './dispatchers';

//----------------------------------------------------------------------
class Settings extends React.Component {
  getInner = () => {
    var params = this.props.match.params.query ? this.props.match.params.query.replace('-', '/') : '';
    return <SettingsInner subpage={params} match={this.props.match} />;
  };

  getHelp = () => {
    return (
      <HelpPanel>
        Monitors are per-address index caches that enable fast retreival of appearance histories for any account.
      </HelpPanel>
    );
  };

  render = () => {
    return <Page inner={this.getInner()} help={this.getHelp()} />;
  };
}
export default Settings;
export { dispatcher_Settings, settings_menu };
