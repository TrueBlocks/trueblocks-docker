import React from 'react';
import { Page } from 'components';
import OtherInner from './inner';
import { dispatcher_Other, other_menu } from './dispatchers';
import { findMenu } from 'utils';

//----------------------------------------------------------------------
function Other({ match }) {
  return (
    <Page inner={<OtherInner key={Math.random()} cur_submenu={findMenu('other', other_menu, match)} />} />
  );
}
export default Other;

export { dispatcher_Other, other_menu };
