import React from 'react';
import Page from '../../components/page';
import CachesInner from './caches-inner';

//----------------------------------------------------------------------
export default class Caches extends Page {
  render = () => {
    return <Page inner={<CachesInner />} />;
  };
}