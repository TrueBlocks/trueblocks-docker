import React from 'react';
import ConnectionComponent from '../components';
import IndexProgress from './addrIndex_progress';

const Home = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <div className="right-panel">
      <IndexProgress props={props} />
    </div>
  </div>
);

export default Home;
