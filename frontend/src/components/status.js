import React from 'react';
import StatusInner from './status-inner';

import './status.css';

export const Status = (props) => {
  return (
    <div className="status-panel">
      <div className="title status">Status</div>
      <StatusInner {...props} />
    </div>
  );
};
