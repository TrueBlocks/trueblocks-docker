import React from 'react';
import ConnectionDetails from './connection-inner';

import './connection.css';

const ConnectionComponent = (props) => {
  return (
    <div className="status-panel">
      <h1>Status</h1>
      <ConnectionDetails {...props} />
    </div>
  );
};

export default ConnectionComponent;
