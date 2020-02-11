import React from 'react';
import { Page } from 'components';
import CachesInner from './inner';
import { dispatcher_Caches, caches_menu } from './dispatchers';
import { findMenu } from 'utils';

//----------------------------------------------------------------------
function Caches({ match }) {
  return (
    <Page inner={<CachesInner key={Math.random()} cur_submenu={findMenu('caches', caches_menu, match)} />} />
  );
}
export default Caches;

export { dispatcher_Caches, caches_menu };
