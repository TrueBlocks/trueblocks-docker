import React from 'react';
import { Page } from 'components';
import MonitorsInner from './inner';
import { dispatcher_Monitors, monitors_menu } from './dispatchers';
import { findMenu } from 'utils';

//----------------------------------------------------------------------
function Monitors({ match }) {
  return (
    <Page inner={<MonitorsInner key={Math.random()} cur_submenu={findMenu('monitors', monitors_menu, match)} />} />
  );
}
export default Monitors;

export { dispatcher_Monitors, monitors_menu };
