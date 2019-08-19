import React from 'react'
import SystemStatus from './system-status'
import MonitorStatus from './monitor-status'


const Home = props => (
  <div className="home">
    <SystemStatus/>
    <MonitorStatus/>
  </div>
)

export default Home;