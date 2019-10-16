import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { getStatus } from '../../modules/systemStatus'
import { withPolling } from "../../modules/withPolling"

const ConnectionStatus = (props) => {
    return (
      <div className="system-status">
        <h1>Connection</h1>
        <ConnectionDetails {...props}/>
        <button onClick={props.changePage}>Configure</button>
      </div>
    )
}

const ConnectionDetails = (props) => {
        return (
          <div>
            <div className={`system-details`}>
              <div className={`item grouping`}>Ethereum Node</div>
              <div className="item-left">Connection:</div>
              <div className={`item-right ${Number.isInteger(props.chainStatus.client) ? "connected" : "disconnected"}`}>
                {Number.isInteger(props.chainStatus.client) ? "Connected" : "Disconnected"}
              </div> 
              <div className="item-left">Last block:</div>
              <div className="item-right">{props.chainStatus.client}</div>
              <div className="item-left">RPC Provider:</div>
              <div className="item-right">{props.systemData.rpc_provider}</div>
              
              <div className="item grouping">TrueBlocks</div>
              <div className="item-left">Status:</div>
              <div className={`item-right space-after ${props.systemData.is_scraping ? "connected" : "disconnected"}`}>
                {props.systemData.is_scraping ? "Scraping" : "Not Scraping"}
              </div> 
              <div className="item-left">Finalized:</div>
              <div className="item-right">{props.chainStatus.finalized}</div>
              <div className="item-left">Staged:</div>
              <div className="item-right">{props.chainStatus.staging}</div>
              <div className="item-left">Unripe:</div>
              <div className="item-right">{props.chainStatus.unripe}</div>
              <div className="item-left">API Provider:</div>
              <div className="item-right space-after">{props.apiProvider}</div>
              
              <div className="item grouping">Software Versions</div>
              <div className="item-both-small">- {props.systemData.client_version}</div>
              <div className="item-both-small">- {props.systemData.trueblocks_version}</div>
            </div>
          </div>
        )
}

const mapStateToProps = ({ systemStatus, chainStatus, getSettings }) => (
    {
        isConnected: systemStatus.isConnected,
        systemData: systemStatus.systemData,
        isLoading: systemStatus.isLoading,
        chainStatus: systemStatus.chainStatus,
        apiProvider: getSettings.apiProvider
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
)(ConnectionStatus))
