import React from 'react';
import ConnectionStatus from './connection-status';
import IndexProgress from './index-progress';

const Home = (props) => (
  <div className="home">
    <ConnectionStatus props={props} />
    <IndexProgress props={props} />
  </div>
);

export default Home;
