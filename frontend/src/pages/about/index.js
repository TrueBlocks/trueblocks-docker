import React from 'react';
import Page from '../../components/page';
import AboutInner from './about-inner';

//----------------------------------------------------------------------
export default class About extends Page {
  render = () => {
    return <Page inner={<AboutInner />} />;
  };
}
