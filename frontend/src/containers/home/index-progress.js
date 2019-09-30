import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { humanFileSize } from '../../helpers/filesize'
import { getIndexData } from '../../modules/getIndexData'
import SystemProgressChart from './system-progress-chart'

const IndexProgress = (props) => {
    const ready = props.systemData.caches !== undefined && props.chainStatus.finalized !== undefined
    let readyContainer
    switch (ready) {
        case true:
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
        default:
            readyContainer = <div>Loading...</div>
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

const ZoomOnIndex = (props) => {
    const hasData = props.indexData.items !== undefined
    let readyContainer
    console.log(hasData)
    switch(hasData) {
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
