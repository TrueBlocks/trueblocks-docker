import React from 'react';
import ConnectionComponent from '../components';

const Names = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <div className="right-panel">
      <h1>
        Names
        <div className="description-note">
          The TrueBlocks names component allows one to name Ethereum addresses, function signatures and smart contract
          event signatures.
        </div>
      </h1>
      <div className="inner-panel">
        <h4 className="inner-panel">Names Group 1</h4>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <h4>Group 2</h4>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    </div>
  </div>
);

export default Names;
