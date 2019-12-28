import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from './icon';
import './loading.css';

//----------------------------------------------------------------------
export class Loading extends React.Component {
  render = () => {
    if (this.props.status === 'error') {
      var msg;
      if (typeof this.props.message === 'object') {
        msg = JSON.stringify(this.props.message);
      } else if (!this.props.message) {
        msg = 'There has been some sort of unspecified error';
      } else {
        msg = this.props.message;
        if (this.props.message.indexOf('fetch') !== -1) {
          msg = this.props.message + ' ==> Is the TrueBlocks API running?';
        }
      }
      if (msg.indexOf('SyntaxError') !== -1) msg += '. Is the API producing valid JSON?';
      return (
        <div className="error-msg">
          <Icon icon="error" onClick={null} />
          <h3>{msg}</h3>
          <br />
          <Icon icon="error" onClick={null} />
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

  static propTypes = {
    source: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
  };
}
