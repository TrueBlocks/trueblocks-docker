import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { humanFileSize } from '../../helpers/filesize'
import { fmtInteger } from '../../helpers/number_fmt'
import { getIndexData } from '../../modules/getIndexData'
import Loading from '../common/loading'

const IndexProgress = (props) => {

    let status
    if (props.isLoading) {
        status = "loading"
    }
    if (props.error) {
        status = "error"
    } else if (props.systemData.caches === undefined && props.chainStatus.finalized === undefined) {
        status = "initializing"
    } else {
        status = "ready"
    }

    let container
    switch (status) {
        case "ready":
            const size = humanFileSize(props.systemData.caches[0].sizeInBytes)
            const nFiles = props.systemData.caches[0].nFiles
            container = (
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
            container = <Loading status={status} message="Initializing..." />
            break;
        case "error":
            container = <Loading status={status} message={props.error} />
            break;
        default:
            container = <Loading status={status} message="Loading..." />
    }
    return (
        <div className="system-progress">
            <h1>Index Progress</h1>
            <p>
                The index is a set of files that save appearances in the form blockNumber, transactionId, traceId, address.
                These files are roughly the same size.
                You can set some options about this in the Settings tab.
            </p>
            {container}
        </div>
    )
}

class SystemProgressChart extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            zoomStart: undefined
        }
    }

    // const ripe = props.chainStatus.ripe;
    unripe = this.props.chainStatus.unripe;
    finalized = this.props.chainStatus.finalized;
    clientHead = (this.props.chainStatus.client === "n/a" ? this.unripe : this.props.chainStatus.client);

    rows = Math.ceil(this.clientHead / 1e6)
    cols = 10

    zoom = (zoomStart) => {
        this.setState({ ...this.state, zoomStart })
    }

    chart = (
        <div className='chart-container'>
            <div className='y-axis grid'></div>
            {[...Array(this.cols).keys()].map((col, colI) => {
                return <div className='y-axis grid' key={`x${col}`}>{col * 1e5}</div>
            })}
            {[...Array(this.rows).keys()].map((row, rowI) => {
                return (
                    <React.Fragment key={`x${row}`}>
                        <div className='x-axis grid'>{row * 1e6}</div>
                        {[...Array(this.cols).keys()].map((col, colI) => {
                            let indexClass
                            if (this.finalized >= row * 1e6 + (col + 1) * 1e5) {
                                indexClass = 'finalized'
                            } else if (this.finalized >= row * 1e6 + col * 1e5) {
                                indexClass = 'in-progress'
                            } else {
                                indexClass = 'inactive'
                            }
                            return (
                                <div className='grid' key={`x${row}${col}`}>
                                    <div className={`filling ${indexClass}`} onClick={() => this.zoom(row * 1e6 + col * 1e5)}>
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
    render() {
        return (
            <div>
                {this.chart}
                <ZoomOnIndex {...this.props} start={this.state.zoomStart} n={1e5} />
            </div>
        )
    }
}

// Without this, the !props.loadingIndex test below is always true until one clicks on the page after relaod
var been_here = false;
const ZoomOnIndex = (props) => {
    const hasData = props.indexData.items !== undefined && props.start !== undefined
    let readyContainer

    switch (hasData) {
        case true:
            const data = props.indexData.items.filter(item =>
                item.path.startsWith('finalized') &
                item.firstAppearance >= props.start &
                item.firstAppearance < props.start + props.n
            )
            readyContainer = (
                <div>
                    <IndexTable data={data} range={{start: props.start, end: props.start + props.n}} />
                </div>
            )
            break;
        default:
            if (!been_here && !props.loadingIndex) {
                been_here = true;
                props.getIndexData()
            }
            readyContainer = props.start && <Loading status="loading" message="Waiting for index data..." />
    }

    return (
        <div>{readyContainer}</div>
    )
}

const IndexTable = (props) => {
    const count = props.data.length
    return (
        <div>
            <h3>Block range {props.range.start}-{props.range.end}:</h3>
            <div>{count} index files</div>
            <div className="index-container">
            {props.data.map(item =>
                <div className="index-node" key={`x${item.firstAppearance}`}>
                <div>ipfs hash:</div> <div className="inright_blue">{item.hash}</div>
                <div>first block:</div> <div className="inright">{fmtInteger(item.firstAppearance)}</div>
                {/* <div>latest block:</div> <div className="inright">{fmtInteger(item.latestAppearance)}</div> */}
                <div>nBlocks:</div> <div className="inright">{fmtInteger(item.latestAppearance - item.firstAppearance + 1)}</div>
                <div>nAddresses:</div> <div className="inright">{fmtInteger(item.nAddresses)}</div>
                <div>nAppearances:</div> <div className="inright_red">{fmtInteger(item.nAppearances)}</div>
                <div>file size:</div> <div className="inright">{humanFileSize(item.sizeInBytes)}</div>
                </div>
            )}
            </div>
        </div>
    )
}


const mapStateToProps = ({ systemStatus, getIndexData }) => (
    {
        systemData: systemStatus.systemData,
        chainStatus: systemStatus.chainStatus,
        isLoading: systemStatus.isLoading,
        error: systemStatus.error,
        indexData: getIndexData.indexData,
        loadingIndex: getIndexData.isLoading
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
