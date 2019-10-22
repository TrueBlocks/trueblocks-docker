import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { getStatus } from '../../modules/systemStatus'
import { withPolling } from "../../modules/withPolling"
import { fmtInteger } from '../../helpers/number_fmt'
import green_light from '../../img/green.png'
import yellow_light from '../../img/yellow.png'
import red_light from '../../img/red.png'

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
        const client = props.chainStatus.client
        const finalized = props.chainStatus.finalized
        const staging = props.chainStatus.staging
        const unripe = props.chainStatus.unripe
        var final_behind = (props.chainStatus.client - props.chainStatus.finalized).toString()
        final_behind += " blocks, about " + (Math.floor((props.chainStatus.client - props.chainStatus.finalized) * 100/ (60/14)) / 100).toString() + " minutes"
        var staging_behind = (props.chainStatus.client - props.chainStatus.staging).toString()
        staging_behind += " blocks, about " + (Math.floor((props.chainStatus.client - props.chainStatus.staging) * 100 / (60 / 14)) / 100).toString() + " minutes"
        return (
          <div>
            <div className={`system-details`}>
              <div className={`item grouping`}>Ethereum Node</div>
              <div className="item-left">Connection:</div>
              <div className={`item-right ${Number.isInteger(props.chainStatus.client) ? "connected" : "disconnected"}`}>
                {Number.isInteger(props.chainStatus.client) ? "Connected" : "Disconnected"}
              </div> 
              <div className="item-left">Last block:</div>
              <div className="item-right">{fmtInteger(client)}</div>
              <div className="item-left">RPC Provider:</div>
              <div className="item-right">{props.systemData.rpc_provider}</div>
              
              <div className="item grouping">TrueBlocks</div>
              <div className="item-left">Status:</div>
              <div className={`item-right space-after ${props.systemData.is_scraping ? "connected" : "disconnected"}`}>
                {props.systemData.is_scraping ? "Scraping" : "Not Scraping"}
              </div> 
              <div className="item-left"><img className="traffic_light" alt={green_light} src={green_light} />Finalized:</div>
              <div className="item-right">{fmtInteger(finalized)} <small>(<i>{final_behind}</i>)</small></div>
              <div className="item-left">
                <img className="traffic_light" alt={yellow_light} src={yellow_light} />Staged:</div>
              <div className="item-right">{fmtInteger(staging)} <small>(<i>{staging_behind}</i>)</small></div>
              <div className="item-left"><img className="traffic_light" alt={red_light} src={red_light} />Unripe:</div>
              <div className="item-right">{fmtInteger(unripe)} <small>(<i>{props.chainStatus.client - props.chainStatus.unripe}</i>)</small></div>
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
