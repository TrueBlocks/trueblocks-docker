import React from 'react'
import { connect } from 'react-redux'

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
    const client = props.chainStatus.client;
    const clientHead = props.chainStatus.client + 100;
    const ripe = props.chainStatus.ripe;
    const unripe = props.chainStatus.unripe;
    const finalized = props.chainStatus.finalized;

    console.log(client, clientHead, ripe, unripe, finalized)

    let bars = {}
    bars.finalized = {pct: Math.floor((finalized) / clientHead * 100), color: "#009900"}
    bars.ripe = {pct: Math.floor((ripe - finalized) / clientHead * 100), color: "#55AA55"}
    bars.unripe = {pct: Math.floor((unripe - ripe) / clientHead * 100), color: "#99AA99"}
    bars.unsynced = {pct: Math.floor((client - ripe) / clientHead * 100), color: "#DDDDDD"}

    let order = ["finalized", "ripe", "unripe", "unsynced"]

    return (
        <div>
            <div className="progress-bar stripes">
                {order.map(item => 
                    <span style={{width: bars[item].pct + '%', backgroundColor: bars[item].color}}></span>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = ({ indexData, systemStatus }) => (
    {
        systemData: systemStatus.systemData,
        chainStatus: systemStatus.chainStatus,
        indexData: indexData.data,
        isLoading: indexData.isLoading
    }
)

export default connect(
  mapStateToProps,
)(SystemProgress)
