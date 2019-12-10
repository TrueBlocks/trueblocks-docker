import React from 'react';
import ConnectionInner from './connection-inner';

import './connection.css';

const ConnectionComponent = (props) => {
  return (
    <div className="status-panel">
      <h1>Status</h1>
      <ConnectionInner {...props} />
    </div>
  );
};

export default ConnectionComponent;
