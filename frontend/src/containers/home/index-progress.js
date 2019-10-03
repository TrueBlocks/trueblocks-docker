import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { humanFileSize } from '../../helpers/filesize'
import { getIndexData } from '../../modules/getIndexData'
import Loading from '../common/loading'

const IndexProgress = (props) => {
    
    let status
    if (props.isLoading) {
        status = "loading"
    } else if (props.error) {
        status = "error"
    } else if (props.systemData.caches === undefined || props.chainStatus.finalized !== undefined) {
        status = "initializing"
    } else {
        status = "ready"
    }

    let readyContainer
    switch (status) {
        case "ready":
            const size = humanFileSize(props.systemData.caches[0].sizeInBytes)
            const nFiles = props.systemData.caches[0].nFiles
            readyContainer = (
                <div>
                    <SystemProgressChart {...props} />
                    <div className='fun-facts'>
                        <div>
                            Index Size: {size}
                        </div>
                        <div>
                            Number of index files: {nFiles}
                        </div>
                    </div>
                </div>
            )
            break;
        case "initializing":
            readyContainer = <Loading status="Initializing" message="Initializing..." />
            break;
        case "error":
            readyContainer = <Loading status="Error" message={props.error} />
            break;
        default:
            readyContainer = <Loading status="Loading" message="Loading..." />
    }
    return (
        <div className="system-progress">
            <h1>Index Progress</h1>
            <p>
                The index is a set of files that save appearances in the form blockNumber, transactionId, traceId, address.
                These files are roughly the same size.
                You can set some options about this in the Settings tab.
            </p>
            {readyContainer}
        </div>
    )
}

const SystemProgressChart = (props) => {

    // const ripe = props.chainStatus.ripe;
    const unripe = props.chainStatus.unripe;
    const finalized = props.chainStatus.finalized;
    const clientHead = (props.chainStatus.client == "n/a" ? unripe : props.chainStatus.client);

    const rows = Math.ceil(clientHead / 1e6)
    const cols = 10

    const chart = (
        <div className='chart-container'>
            <div className='y-axis grid'></div>
            {[...Array(cols).keys()].map((col, colI) => {
                return <div className='y-axis grid' key={`x${col}`}>{col * 1e5}</div>
            })}
            {[...Array(rows).keys()].map((row, rowI) => {
                return (
                    <React.Fragment key={`x${row}`}>
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
                                <div className='grid' key={`x${row}${col}`}>
                                    <div className={`filling ${indexClass}`}>
                                        {indexClass === 'finalized' && '✔'}
                                    </div>
                                </div>
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
            {/* <ZoomOnIndex {...props} start={26e5} n={1e5}/> */}
            {chart}
        </div>
    )
}

const ZoomOnIndex = (props) => {
    const hasData = props.indexData.items !== undefined
    let readyContainer
    console.log(hasData)
    switch (hasData) {
        case true:
            const data = props.indexData.items.filter(item =>
                item.path.startsWith('finalized') &
                item.firstAppearance >= props.start &
                item.firstAppearance < props.start + props.n
            )
            console.log(data)
            readyContainer = (
                <div>
                    {data.map((item) =>
                        <div>
                            {item.firstAppearance}
                            -
                        {item.nAddresses}
                            -
                        {humanFileSize(item.sizeInBytes)}
                        </div>
                    )}
                </div>
            )
            break;
        default:
            props.getIndexData()
            readyContainer = <div>Now Loading</div>
    }

    return (
        <div>{readyContainer}</div>
    )
}

const mapStateToProps = ({ systemStatus, getIndexData }) => (
    {
        systemData: systemStatus.systemData,
        chainStatus: systemStatus.chainStatus,
        isLoading: systemStatus.isLoading,
        error: systemStatus.error,
        indexData: getIndexData.indexData
    }
)

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getIndexData
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(IndexProgress)
