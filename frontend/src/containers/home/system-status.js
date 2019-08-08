import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import {
  getStatus
} from '../../modules/trueblocks'
import {withPolling} from "../../modules/withPolling"

const SystemStatus = (props) => {
    return (
        <div>
            <SystemDetails {...props}/>
            <button onClick={props.changePage}>
            Settings
          </button>
        </div>
    )
}

class SystemDetails extends React.Component {
   componentDidMount = () => {
    // return this.props.getStatus();
   }
   render = () => {
    console.log(this.props.systemData.is_scraping)
    if(this.props.systemData.is_scraping !== undefined) {
        return (<div>
        <h1>System Status</h1>
        <p>API status: {`${this.props.systemData.is_scraping}`}</p>
        <p>Scraping: true</p>
        <p>Block Number: 7241000</p>
        <p>Head of chain: 7500000</p>
        <p>Api endpoint: localhost:8080</p>
        <p>Client version: Trueblocks v0.7</p>
        <p>Disk size: 9GB</p>
    
        <p>Node status: {this.props.systemData.is_scraping}</p>
        <p>Scraping: true</p>
        <p>Block Number: 7241000</p>
        <p>Head of chain: 7500000</p>
        <p>Api endpoint: localhost:8080</p>
        <p>Client version: Trueblocks v0.7</p>
        <p>Disk size: 9GB</p>
      </div>)
    }
    return (<div>Not connected</div>)
   }
}

const mapStateToProps = ({ trueblocks }) => (
    {
        systemData: trueblocks.systemData,
        isLoading: trueblocks.isLoading
    }
)

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getStatus,
      changePage: () => push('/settings')
    },
    dispatch
  )

export default withPolling(getStatus)(connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemStatus))
