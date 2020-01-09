import React from 'react';
import Page from '../../components/page';
import SettingsInner from './inner';
import { dispatcher_Settings, settings_menu } from './dispatchers';

//----------------------------------------------------------------------
class Settings extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || 'settings/get';
    params = params.replace('subpage=', '').replace('-', '/'); // weird cleanup
    return <SettingsInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Settings;
export { dispatcher_Settings, settings_menu };