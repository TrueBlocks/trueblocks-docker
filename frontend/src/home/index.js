import React from 'react';
import ConnectionComponent from '../common/connection-status';
import IndexProgress from './addrIndex_progress';

const Home = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <div className="inner-panel">
      <IndexProgress props={props} />
    </div>
  </div>
);

export default Home;
