import React from 'react'
import SystemStatus from './system-status'
import MonitorStatus from './monitor-status'
import IndexProgress from './index-progress'


const Home = props => (
  <div className="home">
    <SystemStatus/>
    <IndexProgress/>
    <MonitorStatus/>
  </div>
)

export default Home;
