import React from 'react';
import Page from '../../components/page';
import SettingsInner from './settings-inner';

//----------------------------------------------------------------------
var Settings = (props) => {
  var subpage = 'settings/' + (props.match.params.subpage || 'config');
  var inner = <SettingsInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Settings;