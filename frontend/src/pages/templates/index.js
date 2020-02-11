import React from 'react';
import { Page } from 'components';
import [{PROPER}]Inner from './inner';
import { dispatcher_[{PROPER}], [{LOWER}]_menu } from './dispatchers';
import { findMenu } from 'utils';

//----------------------------------------------------------------------
function [{PROPER}]({ match }) {
  return (
    <Page inner={<[{PROPER}]Inner key={Math.random()} cur_submenu={findMenu('[{LOWER}]', [{LOWER}]_menu, match)} />} />
  );
}
export default [{PROPER}];

export { dispatcher_[{PROPER}], [{LOWER}]_menu };
