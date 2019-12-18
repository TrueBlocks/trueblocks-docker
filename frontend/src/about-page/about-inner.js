import React from 'react';
import InnerHeader from '../components/inner-header';

const AboutInner = (props) => {
  return (
    <div className="right-panel">
      <div>
        <InnerHeader
          title="About TrueBlocks"
          notes="Learn about the TrubBlocks project, our organization, our philosopy
          towards decentralization, and our team."
        />
        <div className="inner-panel">
          <h4>QuickBlocks</h4>
          The fastest, fully-decentralized way to access data from any Ethereum address or smart contract. Providing
          open source software libraries and tools for developers and accounting / auditing / monitoring solutions for
          the rest of us.
          <h4>Design Philosophy</h4>
          Local-first, 100% decentralized access to full detail Ethereum activity per account on consumer-grade
          hardware.
          <h4>Team</h4>
          Thomas Rush, Ed Mazurek, Joe G., Todd
        </div>
      </div>
    </div>
  );
};

export default AboutInner;
