import React from 'react';
import Page from '../../components/page';
import ExploreInner from './explore-inner';

//----------------------------------------------------------------------
export default class Explore extends Page {
  render = () => {
    return <Page inner={<ExploreInner />} />;
  };
}
