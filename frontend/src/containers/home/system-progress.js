import React from 'react'
import { connect } from 'react-redux'
import { humanFileSize } from '../../helpers/filesize'

const SystemProgress = (props) => {
    const ready = props.systemData.caches !== undefined && props.chainStatus.finalized !== undefined
    let container
    switch (ready) {
        case true:
            container = (
                <div>
                    <div>
                        Total Size: {humanFileSize(props.systemData.caches[0].sizeInBytes)}
                    </div>
                    <div>
                        Number of index files: {props.systemData.caches[0].nFiles}
                    </div>
                        <SystemProgressChart {...props} />
                    }
                </div>
            )
            break;
        default:
            container = <div>Loading...</div>
    }
    return (
        <div className="system-progress">
            <h1>Index Progress</h1>
            {container}
        </div>
    )
}

const Checkmark = () => {
    return (
        <span className="checkmark">
            <div className="checkmark_circle"></div>
            <div className="checkmark_stem"></div>
            <div className="checkmark_kick"></div>
        </span>
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
                            let indexClass
                            if (finalized >= row * 1e6 + (col + 1) * 1e5) {
                                indexClass = 'finalized'
                            } else if (finalized >= row * 1e6 + col * 1e5) {
                                indexClass = 'in-progress'
                            } else {
                                indexClass = 'inactive'
                            }
                            return (
                                <div className='grid'><div className={`filling ${indexClass}`}>{indexClass === 'finalized' && '✔'}</div></div>
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
