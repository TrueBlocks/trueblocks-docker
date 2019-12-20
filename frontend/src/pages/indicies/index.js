import React from 'react';
import Page from '../../components/page';
import IndiciesInner from './indicies-inner';

//----------------------------------------------------------------------
export default class Indicies extends Page {
  render = () => {
    return <Page inner={<IndiciesInner />} />;
  };
}