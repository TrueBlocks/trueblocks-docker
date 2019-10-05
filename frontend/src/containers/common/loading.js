import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Loading = (props) => {
    const symbol = props.status === "error" ? "✖" : "..."
    return (
        <div className={`loading ${props.status}`}>
            <div className="container">
                <div className="symbol">{symbol}</div>
                <div>{props.status}</div>          
                <div>{props.message}</div>
            </div>
        </div>
    )
}

export default Loading
