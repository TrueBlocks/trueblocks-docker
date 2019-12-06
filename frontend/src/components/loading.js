import React from 'react';

const Loading = (props) => {
  const symbol =
    props.status === 'error' ? (
      '✖'
    ) : (
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
