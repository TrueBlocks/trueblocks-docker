import React from 'react';
import Page from '../../components/page';
import SettingsInner from './settings-inner';

//----------------------------------------------------------------------
export default class Settings extends Page {
  render = () => {
    return <Page inner={<SettingsInner />} />;
  };
}