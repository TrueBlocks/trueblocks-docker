import React from 'react';
import { Page } from 'components';
import NamesInner from './inner';
import { dispatcher_Names, names_menu } from './dispatchers';
import { findMenu } from 'utils';

//----------------------------------------------------------------------
function Names({ match }) {
  return (
    <Page inner={<NamesInner key={Math.random()} cur_submenu={findMenu('names', names_menu, match)} />} />
  );
}
export default Names;

export { dispatcher_Names, names_menu };
