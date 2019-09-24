import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getMonitorStatus } from '../../modules/monitorStatus'
import { monitorRemove } from '../../modules/monitorRemove'
import { monitorAdd } from '../../modules/monitorAdd'
import { withPolling } from '../../modules/withPolling'
import { humanFileSize } from '../../helpers/filesize'
import trash from "../../img/trash-alt.svg"

const MonitorStatus = (props) => {
  return (
    <div className="monitor-status">
      <h1>Monitor Details</h1>
      <p>
        Monitors are per-address index caches.
        They enable fast appearance history access.
        They can be added and deleted.</p>
      <MonitorDetails {...props} />
    </div>
  )
}


const MonitorDetails = (props) => {
  const ready = props.monitorStatus !== undefined && props.monitorStatus.items !== undefined
  return (
    <div className={`monitor-details`}>
      <MonitorAdd {...props} />
      {ready && props.monitorStatus.items.map((item, index) => (
        <MonitorDetail index={index} {...item} rmMonitor={props.rmMonitor} key={`a${item.address}`} />
      ))}
    </div>
  )
}

const MonitorAdd = (props) => {
  let inputAddress
  const onSubmit = (e) => {
    e.preventDefault();
    props.addMonitor(inputAddress.value)
  }
  return (
    <div className="detail-container">
      <div className="row-detail">
        <div className="index">
        </div>
        <div className="display-name">
          <form onSubmit={onSubmit}>
            <input placeholder="0x000000000000000000000000000000000000000000" ref={el => inputAddress = el}></input>
            <button>＋ Add Monitor</button>
          </form>
        </div>
        <div className="size"></div>
        <div className="trash"></div>
      </div>
    </div>
  )
}
    
class MonitorDetail extends React.Component {
        constructor(props) {
        super(props)
    this.state = {
        wasDeleted: false,
      isExpanded: false
    }
  }

  handleClick = (el) => {
    if(!this.state.wasDeleted) {
        this.props.rmMonitor(this.props.address)
      this.setState({wasDeleted: true})
    }
  }

  toggle = () => {
        this.setState({ isExpanded: !this.state.isExpanded })
      }

      render () {
    const displayName = this.props.name ? this.props.name : this.props.address
      const monitorSize = humanFileSize(this.props.sizeInBytes)
      return (
      <div className={`detail-container ${this.state.wasDeleted ? 'disabled' : ''}`}>
        <div className='row-detail' onClick={this.toggle}>
          <div className='index'>{this.props.index}</div>
          <div className='display-name'>{displayName}</div>
          <div className='size'>{monitorSize}</div>
          <div className='trash' onClick={this.handleClick}><img alt={trash} src={trash} width="10px" /></div>
        </div>
        <div className={`detail ${!this.state.isExpanded ? 'hidden' : ''}`}>
          {this.props.name ? <li className="name">{this.props.name}</li> : null}
          {this.props.group ? <li>{this.props.subgroup ? this.props.group + "/" + this.props.subgroup : this.props.group}</li> : null}
          <li className="address">{this.props.address}</li>
          <li>Ether balance = {this.props.curEther}</li>
          <li>nRecords = {this.props.nRecords}</li>
          <li>Size (Bytes) = {this.props.sizeInBytes}</li>
        </div>
      </div>
      )
    }
  }
  
const mapStateToProps = ({monitorStatus, monitorRemove}) => (
    {
        monitorStatus: monitorStatus.monitorStatus,
      monitorRemove: monitorRemove.error
  }
)

const mapDispatchToProps = dispatch =>
bindActionCreators(
    {
        getMonitorStatus,
        rmMonitor: (address) => monitorRemove(address),
      addMonitor: (address) => monitorAdd(address)
    },
    dispatch
  )

  export default withPolling(getMonitorStatus, 20000)(connect(
    mapStateToProps,
    mapDispatchToProps
  )(MonitorStatus))
