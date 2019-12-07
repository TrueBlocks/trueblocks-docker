import React from 'react';
import error_icon from '../z_img/error-icon.png';
import './loading.css';

/**
 * Loading - displays during data loading
 */
const Loading = (props) => {
  if (props.status === 'erro2r') {
    var isFail = props.message && props.message.indexOf('Failed to fetch') !== -1;
    var msg2;
    if (isFail) msg2 = 'Error message: ' + props.message + '. Is the API running?';

    return (
      <div className="error-msg">
        <img className="error-icon" alt={error_icon} src={error_icon} />A connection to the Ethereum node, TrueBlocks,
        or both was not found.
        <p>
          Please see{' '}
          <a href="http://localhost:3000/docs/#header-installation" rel="noopener noreferrer" target="_blank">
            these instructions
          </a>{' '}
          for installation information.
        </p>
        <img className="error-icon" alt={error_icon} src={error_icon} /> {msg2}
      </div>
    );
  }

  const symbol = (
    //    props.status === 'error' ? (
    //      '✖'
    //    ) :
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
