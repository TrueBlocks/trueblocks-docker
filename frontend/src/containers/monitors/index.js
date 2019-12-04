import React from 'react';
import MonitorStatus from './monitor-status';

const Monitors = (props) => (
  <div className="monitors">
    <MonitorStatus props={props} />
  </div>
);

export default Monitors;
