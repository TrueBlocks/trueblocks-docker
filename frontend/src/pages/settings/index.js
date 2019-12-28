import React from 'react';
import Page from '../../components/page';
import SettingsInner from './inner';

//----------------------------------------------------------------------
class Settings extends React.Component {
  getInner = () => {
    var subpage = 'settings/' + (this.props.match.params.subpage || 'config');
    return <SettingsInner subpage={subpage} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Settings;