import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Loading = (props) => {
    return (
        <div>
            <div>{props.status}</div>          
            <div>{props.message}</div>
        </div>
    )
}

export default Loading
