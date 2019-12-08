//---------------------------------------------------------------------
import React from 'react';
import ConnectionComponent from '../z_components';
import PageNotes from '../z_components/page-notes';
import MonitorDetails from './monitors-inner';

//---------------------------------------------------------------------
const Monitors = (props) => {
  return (
    <div className="page">
      <ConnectionComponent props={props} />
      <div className="right-panel">
        <h1>
          Address Monitors
          <PageNotes text="Monitors are per-address index caches that enable fast reteival of appearance histories for any account." />
        </h1>
        <MonitorDetails {...props} />
      </div>
    </div>
  );
};

export default Monitors;
