import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getStatus
} from '../../modules/trueblocks'

class SystemStatus extends React.Component {
   componentDidMount = () => {
    return this.props.getStatus();
   }
   render = () => {
    if(this.props.data.data) {
        return (<div>
        <h1>System Status</h1>
        <p>API status: {this.props.data.data.scraping}</p>
        <p>Scraping: true</p>
        <p>Block Number: 7241000</p>
        <p>Head of chain: 7500000</p>
        <p>Api endpoint: localhost:8080</p>
        <p>Client version: Trueblocks v0.7</p>
        <p>Disk size: 9GB</p>
    
        <p>Node status: {this.props.data.length}</p>
        <p>Scraping: true</p>
        <p>Block Number: 7241000</p>
        <p>Head of chain: 7500000</p>
        <p>Api endpoint: localhost:8080</p>
        <p>Client version: Trueblocks v0.7</p>
        <p>Disk size: 9GB</p>
          <button onClick={this.props.getStatus} disabled={this.props.isLoading}>
            Go to about page via redux
          </button>
    
      </div>)
    }
    return (<div>Not connected</div>)
   }
}

const mapStateToProps = ({ trueblocks }) => (
    {
        data: trueblocks.data,
        isLoading: trueblocks.isLoading
    }
)

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getStatus,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemStatus)
