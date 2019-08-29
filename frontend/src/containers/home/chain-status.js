//import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getChainStatus} from '../../modules/chainStatus'
import {withPolling} from "../../modules/withPolling"


const ChainStatus = (props) => {
        return('')
}

const mapStateToProps = ({ chainStatus }) => (
    {
        chainStatus: chainStatus.chainStatus,
        isLoading: chainStatus.isLoading
    }
)

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getChainStatus,
    },
    dispatch
  )

export default withPolling(getChainStatus, 20000)(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChainStatus))
