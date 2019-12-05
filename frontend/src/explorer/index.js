import React from 'react';
import ConnectionComponent from '../common/connection-status';

const Explorer = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <div className="inner-panel">
      <h1>
        Explorer
        <div className="description-note">
          This is the TrueBlocks Explorer. This is the TrueBlocks Explorer.This is the TrueBlocks Explorer. This is the
          TrueBlocks Explorer. This is the TrueBlocks Explorer. This is the TrueBlocks Explorer.
        </div>
      </h1>
    </div>
  </div>
);

export default Explorer;
