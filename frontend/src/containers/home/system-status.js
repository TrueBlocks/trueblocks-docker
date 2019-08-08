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
        <div className="system-status">
            <h1>System Status</h1>
            <SystemDetails {...props}/>
            <button onClick={props.changePage}>
            Settings
          </button>
        </div>
    )
}

const SystemDetails = (props) => {
    console.log(props.systemData.is_scraping)
    if(props.systemData.is_scraping !== undefined) {
        return (<div className="system-details">
        <div className="item">API status:</div>
        <div className="item">{`${props.systemData.is_scraping}`}</div>
        <div className="item">Scraping:</div>
        <div className="item">true</div>
        <div className="item">Block Number:</div>
        <div className="item">7241000</div>
        <div className="item">Head of chain:</div>
        <div className="item">7500000</div>
        {/* <p>Api endpoint: localhost:8080</p>
        <p>Client version: Trueblocks v0.7</p>
        <p>Disk size: 9GB</p> */}
    
        {/* <p>Node status: {props.systemData.is_scraping}</p>
        <p>Scraping: true</p>
        <p>Block Number: 7241000</p>
        <p>Head of chain: 7500000</p>
        <p>Api endpoint: localhost:8080</p>
        <p>Client version: Trueblocks v0.7</p>
        <p>Disk size: 9GB</p> */}
      </div>)
    }
    return (<div>Not connected</div>)
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
