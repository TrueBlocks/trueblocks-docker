import React from 'react';
import ConnectionInner from './connection-inner';

import './connection.css';

export const Connection = (props) => {
  return (
    <div className="status-panel">
      <h1>Status</h1>
      <ConnectionInner {...props} />
    </div>
  );
};
