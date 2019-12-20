import React from 'react';
import Page from '../../components/page';
import SignaturesInner from './signatures-inner';

//----------------------------------------------------------------------
export default class Signatures extends Page {
  render = () => {
    return <Page inner={<SignaturesInner />} />;
  };
}