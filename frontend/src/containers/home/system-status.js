import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import {
  getStatus
} from '../../modules/systemStatus'
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
        // let syncPct = props.systemData.parityLatestBlock === "" | props.systemData.parityLatestBlock === 0 ? "0%" : Math.floor( 100 * props.systemData.lastConsolidated / props.systemData.parityLatestBlock) + "%";
        return (<div>
          <div className={`system-details`}>
        {/* <div className="item grouping">Connection</div>
        <div className="item">TrueBlocks daemon:</div>
        <div className={`item ${props.systemData.isConnected ? "connected" : "disconnected"}`}>{props.systemData.isConnected ? "Connected" : "Disconnected"}</div>
        <div className="item">Ethereum Node:</div>
        <div className={`item space-after ${props.systemData.isConnected ? "connected" : "disconnected"}`}>{props.systemData.isConnected ? "Connected" : "Disconnected"}</div> */}
        <div className={`item grouping`}>Ethereum Node</div>
        <div className="item">Connection:</div>
        <div className={`item ${props.isConnected ? "connected" : "disconnected"}`}>{props.isConnected ? "Connected" : "Disconnected"}</div> 
        <div className="item">Current block:</div>
        <div className="item">{props.chainStatus.client}</div>
        <div className="item">RPC Provider:</div>
        <div className="item">{props.systemData.rpc_provider}</div>
        <div className="item grouping">TrueBlocks Index</div>
        <div className="item">Status:</div>
        <div className={`item space-after ${props.isConnected ? "connected" : "disconnected"}`}>{props.isConnected ? "Scraping" : "Not Scraping"}</div> 
        <div className="item">Finalized:</div>
        <div className="item">{props.chainStatus.finalized}</div>
        <div className="item">Staged:</div>
        <div className="item">{props.chainStatus.staging}</div>
        <div className="item">Unripe:</div>
        <div className="item">{props.chainStatus.unripe}</div>
        <div className="item">API Provider:</div>
        <div className="item space-after">{props.apiProvider}</div>
        <div className="item grouping">System Version</div>
        <div className="item">TrueBlocks:</div>
        <div className="item small">{props.systemData.trueblocks_version}</div>
        <div className="item">Ethereum:</div>
        <div className="item small">{props.systemData.client_version}</div>
      </div>
      </div>)
}

const mapStateToProps = ({ systemStatus, chainStatus, settingsManager }) => (
    {
        isConnected: systemStatus.isConnected,
        systemData: systemStatus.systemData,
        isLoading: systemStatus.isLoading,
        chainStatus: systemStatus.chainStatus,
        apiProvider: settingsManager.apiProvider
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
