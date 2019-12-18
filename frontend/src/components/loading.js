import React from 'react';
import error_icon from '../img/error-icon.png';
import './loading.css';

const Loading = (props) => {
  if (props.status === 'error') {
    var isFail = props.message && props.message.indexOf('Failed to fetch') !== -1;
    var msg1 = props.message;
    var msg2;
    if (isFail) msg2 = 'Is the API running?';

    return (
      <div className="error-msg">
        <img className="error-icon" alt={error_icon} src={error_icon} />
        There is a problem with the connection.
        <p>{msg1}</p>
        <h3>{msg2}</h3>
        <br />
        <img className="error-icon" alt={error_icon} src={error_icon} />
      </div>
    );
  }

  const symbol = (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
  return (
    <div className={`loading ${props.status}`}>
      <div className="container">
        <div className="symbol">{symbol}</div>
        <div>{props.status}</div>
        <div className="message">{props.message}</div>
      </div>
    </div>
  );
};

export default Loading;
