import React from 'react';
import { Page } from '../../components';
import SettingsInner from './inner';
import { dispatcher_Settings, settings_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Settings extends React.Component {
  getInner = () => {
    var item = utils.findMenu('settings', settings_menu, this.props.match);
    return <SettingsInner key={Math.random()} cur_submenu={item} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Settings;
export { dispatcher_Settings, settings_menu };