import React from 'react'
import { connect } from 'react-redux'
// import {withPolling} from "../../modules/withPolling"


const SystemProgress = (props) => {
    return (
        <div className="system-progress">
            <h1>Index Progress</h1>
            <div>
            Size: {props.systemData.caches !== undefined && 
                (props.systemData.caches[0].sizeInBytes * 1e-9).toFixed(5)} GB
            
                </div>
            {props.chainStatus.finalized !== undefined &&
                <SystemProgressChart {...props}/>
            }
        </div>
    )
}

const SystemProgressChart = (props) => {
    let client = props.chainStatus.client;
    let clientHead = props.chainStatus.client + 100;
    let ripe = props.chainStatus.ripe;
    let unripe = props.chainStatus.unripe;
    let finalized = props.chainStatus.finalized;

    console.log(client, clientHead, ripe, unripe, finalized)

    let bars = {}
    bars.finalized = {pct: Math.floor((finalized) / clientHead * 100), color: "#009900"}
    bars.ripe = {pct: Math.floor((ripe - finalized) / clientHead * 100), color: "#55AA55"}
    bars.unripe = {pct: Math.floor((unripe - ripe) / clientHead * 100), color: "#99AA99"}
    bars.unsynced = {pct: Math.floor((client - ripe) / clientHead * 100), color: "#DDDDDD"}

    let order = ["finalized", "ripe", "unripe", "unsynced"]

    console.log(bars);
    console.log(props.chainStatus);
    return (
        <div>
            <div className="progress-bar stripes">
            {/* <span className="red" style={{width: syncPct}}></span> */}
            {order.map(item => 
                <span style={{width: bars[item].pct + '%', backgroundColor: bars[item].color}}></span>
            )}
        </div>
        </div>
    )
}

const mapStateToProps = ({ indexData, chainStatus, systemStatus }) => (
    {
        systemData: systemStatus.systemData,
        chainStatus: chainStatus.chainStatus,
        indexData: indexData.data,
        isLoading: indexData.isLoading
    }
)

export default connect(
  mapStateToProps,
)(SystemProgress)
