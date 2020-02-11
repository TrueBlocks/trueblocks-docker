import React from 'react';
import { Page } from 'components';
import SettingsInner from './inner';
import { dispatcher_Settings, settings_menu } from './dispatchers';
import { findMenu } from 'utils';

//----------------------------------------------------------------------
function Settings({ match }) {
  return (
    <Page inner={<SettingsInner key={Math.random()} cur_submenu={findMenu('settings', settings_menu, match)} />} />
  );
}
export default Settings;

export { dispatcher_Settings, settings_menu };
