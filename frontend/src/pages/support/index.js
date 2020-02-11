import React from 'react';
import { Page } from 'components';
import SupportInner from './inner';
import { dispatcher_Support, support_menu } from './dispatchers';
import { findMenu } from 'utils';

//----------------------------------------------------------------------
function Support({ match }) {
  return (
    <Page inner={<SupportInner key={Math.random()} cur_submenu={findMenu('support', support_menu, match)} />} />
  );
}
export default Support;

export { dispatcher_Support, support_menu };
