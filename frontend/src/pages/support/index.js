import React from 'react';
import Page from '../../components/page';
import SupportInner from './support-inner';

//----------------------------------------------------------------------
export default class Support extends Page {
  render = () => {
    return <Page inner={<SupportInner />} />;
  };
}