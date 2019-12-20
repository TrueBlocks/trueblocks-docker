import React from 'react';
import Proptypes from 'prop-types';
import Icon from './icon';
import './loading.css';

//----------------------------------------------------------------------
export default class Loading extends React.Component {
  render = () => {
    if (this.props.status === 'error') {
      var msg1 = this.props.message;
      if (msg1 && msg1.indexOf('fetch') !== -1) msg1 += ' Is the API running?';
      return (
        <div className="error-msg">
          <Icon icon="error" />
          There is a problem with the connection.
          <h3>{msg1}</h3>
          <br />
          <Icon icon="error" />
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
  status: Proptypes.string,
  message: Proptypes.string
};
