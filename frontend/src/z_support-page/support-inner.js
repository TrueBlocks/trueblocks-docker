import React from 'react';
import InnerHeader from '../z_components/inner-header';

const SupportInner = (props) => {
  return (
    <div className="right-panel">
      <div>
        <InnerHeader title='Support Options' notes="We provide various support options ranging from online email/forum discussions to
          full enterprise-level support plans to suit your needs. We've got you covered."
          />
        <div className="inner-panel">
          <h4 className="inner-panel">Free Support</h4>
          <ul>
            <li>Email support: &lt;support@trueblocks.io&gt;</li>
            <li>Online forums: &lt;https://discord.gg/zGh6PdN&gt;</li>
            <li>Free support during installation and setup</li>
          </ul>
          <h4>Per Incident</h4>
          <ul>
            <li>$95 US per hour until resolved</li>
            <li>Pay in Ether for a 10% discount</li>
          </ul>
          <h4>Support Plans</h4>
          <ul>
            <li>5 per-incident issue packs (10% discount)</li>
            <li>Annual subscription (20% discount)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SupportInner;
