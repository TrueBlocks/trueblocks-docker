import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getBlockAsync
} from '../../modules/trueblocks'

const SystemStatus = props => (
  <div>
    <h1>System Status</h1>
    <p>API status: {props.data.length}</p>
    <p>Scraping: true</p>
    <p>Block Number: 7241000</p>
    <p>Head of chain: 7500000</p>
    <p>Api endpoint: localhost:8080</p>
    <p>Client version: Trueblocks v0.7</p>
    <p>Disk size: 9GB</p>

    <p>Node status: {props.data.length}</p>
    <p>Scraping: true</p>
    <p>Block Number: 7241000</p>
    <p>Head of chain: 7500000</p>
    <p>Api endpoint: localhost:8080</p>
    <p>Client version: Trueblocks v0.7</p>
    <p>Disk size: 9GB</p>
      <button onClick={props.getBlockAsync} disabled={props.isLoading}>
        Go to about page via redux
      </button>

  </div>
)

const mapStateToProps = ({ trueblocks }) => (
  {
  data: trueblocks.data,
  isLoading: trueblocks.isLoading
}
)

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBlockAsync,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemStatus)
