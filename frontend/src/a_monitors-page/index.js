//---------------------------------------------------------------------
import React from 'react';
import ConnectionComponent from '../z_components';
import MonitorsInner from './monitors-inner';

//---------------------------------------------------------------------
const Monitors = (props) => {
  return (
    <div className="page">
      <ConnectionComponent props={props} />
      <MonitorsInner {...props} />
    </div>
  );
};

export default Monitors;
