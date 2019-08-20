import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getMonitorStatus} from '../../modules/monitorStatus'
import {withPolling} from "../../modules/withPolling"
import trash from "../../img/trash-alt.svg"

const MonitorStatus = (props) => {
    return (
        <div className="monitor-status">
            <h1>Monitor Details</h1>
            <MonitorDetails {...props}/>
        </div>
    )
}

const MonitorDetails = (props) => {
         return (<div>
          <div className={`monitor-details`}>
            {props.monitorStatus !== undefined && props.monitorStatus.items !== undefined && props.monitorStatus.items.map((item, index) => (
                <div className="detail-container">
                    <div className="no">
                        <div>{index}</div>
                        <div className="trash"><img src={trash} width="10px"/></div>
                        </div>
                    <div className="detail">
                    {item.name ?
                    <li className="name">{item.name}</li> : null
                    }
                    <li className="address">{item.address}</li>
                    <li>nRecords = {item.nRecords}</li>
                    <li>Size (Bytes) = {item.sizeInBytes}</li>
                    </div>
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
  
