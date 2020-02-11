import React from 'react';
import { Page } from 'components';
import DigestsInner from './inner';
import { dispatcher_Digests, digests_menu } from './dispatchers';
import { findMenu } from 'utils';

//----------------------------------------------------------------------
function Digests({ match }) {
  return (
    <Page inner={<DigestsInner key={Math.random()} cur_submenu={findMenu('digests', digests_menu, match)} />} />
  );
}
export default Digests;

export { dispatcher_Digests, digests_menu };
