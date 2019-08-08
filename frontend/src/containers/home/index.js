import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SystemStatus from './system-status'

const Home = props => (
  <div>
    <SystemStatus/>
  </div>
)

export default Home;