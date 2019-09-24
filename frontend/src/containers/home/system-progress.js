import React from 'react'
import { connect } from 'react-redux'
import { humanFileSize } from '../../helpers/filesize'

const SystemProgress = (props) => {
    return (
        <div className="system-progress">
            <h1>Index Progress</h1>
            <div>
                Size: {props.systemData.caches !== undefined &&
                    (humanFileSize(props.systemData.caches[0].sizeInBytes))}

            </div>
            {props.chainStatus.finalized !== undefined &&
                <SystemProgressChart {...props} />
            }
        </div>
    )
}

const SystemProgressChart = (props) => {

    const clientHead = props.chainStatus.client;
    const ripe = props.chainStatus.ripe;
    const unripe = props.chainStatus.unripe;
    const finalized = props.chainStatus.finalized;

    const rows = Math.ceil(clientHead / 1e6)
    const cols = 10

    const chart = (
        <div className='chart-container'>
            <div className='y-axis grid'></div>
            {[...Array(cols).keys()].map((col, colI) => {
                return <div className='y-axis grid'>{col * 1e5}</div>
            })}
            {[...Array(rows).keys()].map((row, rowI) => {
                return (
                    <React.Fragment>
                    <div className='x-axis grid'>{row * 1e6}</div>
                    {[...Array(cols).keys()].map((col, colI) => {
                        let classes = []
                        if(finalized >= row*1e6 + col*1e5) {
                            classes.push('finalized')
                        } else if(finalized >= row*1e6 + (col-1)*1e5) {
                            classes.push('in-progress')
                        } else {
                            classes.push('inactive')
                        }
                        return (
                            <div className='grid'><div className={`filling ${classes.join(' ')}`}></div></div>
                        )
                    })}
                    </React.Fragment>
                )
            })
        }
        </div>
    )

    return (
        <div>
            {chart}
        </div>
    )
}

// const SystemProgressChart = (props) => {
//     const client = props.chainStatus.client;
//     const clientHead = props.chainStatus.client + 100;
//     const ripe = props.chainStatus.ripe;
//     const unripe = props.chainStatus.unripe;
//     const finalized = props.chainStatus.finalized;

//     console.log(client, clientHead, ripe, unripe, finalized)

//     let bars = {}
//     bars.finalized = {pct: Math.floor((finalized) / clientHead * 100), color: "#009900"}
//     bars.ripe = {pct: Math.floor((ripe - finalized) / clientHead * 100), color: "#55AA55"}
//     bars.unripe = {pct: Math.floor((unripe - ripe) / clientHead * 100), color: "#99AA99"}
//     bars.unsynced = {pct: Math.floor((client - ripe) / clientHead * 100), color: "#DDDDDD"}

//     let order = ["finalized", "ripe", "unripe", "unsynced"]

//     return (
//         <div>
//             <div className="progress-bar stripes">
//                 {order.map(item => 
//                     <span style={{width: bars[item].pct + '%', backgroundColor: bars[item].color}}></span>
//                 )}
//             </div>
//         </div>
//     )
// }

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
