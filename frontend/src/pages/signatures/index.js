import React from 'react';
import { Page } from 'components';
import SignaturesInner from './inner';
import { dispatcher_Signatures, signatures_menu } from './dispatchers';
import { findMenu } from 'utils';

//----------------------------------------------------------------------
function Signatures({ match }) {
  return (
    <Page inner={<SignaturesInner key={Math.random()} cur_submenu={findMenu('signatures', signatures_menu, match)} />} />
  );
}
export default Signatures;

export { dispatcher_Signatures, signatures_menu };
