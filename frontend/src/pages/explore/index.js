import React from 'react';
import { Page } from 'components';
import ExploreInner from './inner';
import { dispatcher_Explore, explore_menu } from './dispatchers';
import { findMenu } from 'utils';

//----------------------------------------------------------------------
function Explore({ match }) {
  return (
    <Page inner={<ExploreInner key={Math.random()} cur_submenu={findMenu('explore', explore_menu, match)} />} />
  );
}
export default Explore;

export { dispatcher_Explore, explore_menu };
