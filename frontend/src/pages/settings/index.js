import React from 'react';
import Page from '../../components/page';
import SettingsInner from './settings-inner';

//----------------------------------------------------------------------
var Settings = (props) => {
  var subpage = props.match.params.subpage ? props.match.params.subpage : 'settings/config';
  var inner = <SettingsInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Settings;