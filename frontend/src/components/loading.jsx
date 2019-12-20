import React from 'react';
import PropTypes from 'prop-types';
import Icon from './icon';
import './loading.css';

//----------------------------------------------------------------------
export default class Loading extends React.Component {
  noop = () => {};
  render = () => {
    if (this.props.status === 'error') {
      var msg;
      if (!this.props.message) {
        msg = 'There has been some sort of unspecified error';
      } else if (typeof this.props.message === 'object') {
        msg = JSON.stringify(this.props.message);
      } else {
        msg = this.props.message;
        if (this.props.message.indexOf('fetch') !== -1) {
          msg = this.props.message + ' ==> Is the TrueBlocks API running?';
        }
      }

      return (
        <div className="error-msg">
          <Icon icon="error" onClick={this.noop} />
          <h3>{msg}</h3>
          <br />
          <Icon icon="error" onClick={this.noop} />
        </div>
      );
    }

    const symbol = (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );

    return (
      <div className={`loading ${this.props.status}`}>
        <div className="container">
          <div className="symbol">{symbol}</div>
          <div>{this.props.status}</div>
          <div className="message">{this.props.message}</div>
        </div>
      </div>
    );
  };
}

//----------------------------------------------------------------------
Loading.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string
};
