import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import {
  getStatus
} from '../../modules/systemStatus'
import ChainStatus from "./chain-status"
import {withPolling} from "../../modules/withPolling"

const SystemStatus = (props) => {
    return (
        <div className="system-status">
            <h1>Status</h1>
            <SystemDetails {...props}/>
            <button onClick={props.changePage}>
            Settings
          </button>
        </div>
    )
}

const SystemDetails = (props) => {
        // let syncPct = props.systemData.parityLatestBlock === "" | props.systemData.parityLatestBlock === 0 ? "0%" : Math.floor( 100 * props.systemData.lastConsolidated / props.systemData.parityLatestBlock) + "%";
        return (<div>
          <div className={`system-details`}>
        {/* <div className="item grouping">Connection</div>
        <div className="item">TrueBlocks daemon:</div>
        <div className={`item ${props.systemData.isConnected ? "connected" : "disconnected"}`}>{props.systemData.isConnected ? "Connected" : "Disconnected"}</div>
        <div className="item">Ethereum Node:</div>
        <div className={`item space-after ${props.systemData.isConnected ? "connected" : "disconnected"}`}>{props.systemData.isConnected ? "Connected" : "Disconnected"}</div> */}
        <div className={`item grouping ${props.isConnected ? "connected" : "disconnected"}`}>Ethereum Node</div>
        <div className="item">Current block:</div>
        <div className="item">{props.chainStatus.finalized}</div>
        <div className="item">Highest block:</div>
        <div className="item space-after">{props.systemData.parityLatestBlock}</div>
        <div className="item grouping">Scraper</div>
        <div className="item">Status:</div>
        <div className="item">{props.systemData.is_scraping ? "Scraping" : "Paused"}</div>
        <div className="item">Block Number:</div>
        <div className="item space-after">{props.systemData.lastConsolidated}</div>
        <div className="item grouping">System Version</div>
        <div className="item">TrueBlocks:</div>
        <div className="item small">{props.systemData.trueblocks_version}</div>
        <div className="item">Ethereum:</div>
        <div className="item small">{props.systemData.client_version}</div>
      </div>

      <ChainStatus/>
      </div>)
    
}

const mapStateToProps = ({ systemStatus, chainStatus }) => (
    {
        systemData: systemStatus.systemData,
        isLoading: systemStatus.isLoading,
        chainStatus: chainStatus.chainStatus
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

export default withPolling(getStatus, 10000)(connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemStatus))
