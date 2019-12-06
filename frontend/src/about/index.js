import React from 'react';
import ConnectionComponent from '../components';

const About = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <div className="right-panel">
      <h1>
        About
        <div className="description-note">
          Learn about the TrubBlocks project, organization, philosopy, and team.Learn about the TrubBlocks project,
          organization, philosopy, and team.
        </div>
      </h1>
      <div className="inner-panel">
        <h4 className="inner-panel">QuickBlocks</h4>
        The fastest, fully-decentralized way to access data from any Ethereum address or smart contract. Providing open
        source software libraries and tools for developers and accounting / auditing / monitoring solutions for the rest
        of us.
        <h4>Design Philosophy</h4>
        Local-first, 100% decentralized access to full detail Ethereum activity per account on consumer-grade hardware.
        <h4>Team</h4>
        Thomas Rush, Ed Mazurek, Joe G., Todd
      </div>
    </div>
  </div>
);

export default About;
