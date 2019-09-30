import React from 'react'
import SystemStatus from './system-status'
import IndexProgress from './index-progress'


const Home = props => (
  <div className="home">
    <SystemStatus/>
    <IndexProgress/>
  </div>
)

export default Home;
