import React from 'react'
import SystemStatus from './system-status'
import MonitorStatus from './monitor-status'
import SystemProgress from './system-progress'


const Home = props => (
  <div className="home">
    <SystemStatus/>
    <SystemProgress/>
    <MonitorStatus/>
  </div>
)

export default Home;