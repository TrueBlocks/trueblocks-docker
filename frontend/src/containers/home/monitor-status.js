import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getMonitorStatus} from '../../modules/monitorStatus'
import {withPolling} from "../../modules/withPolling"

const MonitorStatus = (props) => {
    return (
        <div className="monitor-status">
            <h1>Status</h1>
            <MonitorDetails {...props}/>
        </div>
    )
}

const MonitorDetails = (props) => {
         return (<div>
          <div className={`monitor-details`}>
            {props.monitorStatus.items.map(item => (
                <div>
                    <li>Address = {item.address}</li>
                    <li>nRecords = {item.nRecords}</li>
                    <li>Size (Bytes) = {item.sizeInBytes}</li>
                </div>
            ))}
      </div>
      </div>)
    
}

const mapStateToProps = ({ monitorStatus }) => (
    {
        monitorStatus: monitorStatus.monitorStatus,
    }
)

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMonitorStatus,
    //   changePage: () => push('/settings')
    },
    dispatch
  )

  export default withPolling(getMonitorStatus, 20000)(connect(
    mapStateToProps,
    mapDispatchToProps
  )(MonitorStatus))
  
