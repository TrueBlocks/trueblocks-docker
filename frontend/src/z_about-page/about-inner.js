import React from 'react';
import PageNotes from '../z_components/page-notes';

const AboutInner = (props) => {
  return (
    <div className="right-panel">
      <div>
        <h1>
          About TrueBlocks
          <PageNotes text="Learn about the TrubBlocks project, our organization, our philosopy towards decentralization, and our team." />
        </h1>
        <div className="inner-panel">
          <h4 className="inner-panel">QuickBlocks</h4>
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
