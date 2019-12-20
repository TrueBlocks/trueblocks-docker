import React from 'react';
import Page from '../../components/page';
import OtherInner from './other-inner';

//----------------------------------------------------------------------
export default class Other extends Page {
  render = () => {
    return <Page inner={<OtherInner />} />;
  };
}