import React from 'react';
import ConnectionComponent from '../common/connection-status';

const Support = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <div className="inner-panel">
      <h1>
        Support Options
        <div className="description-note">
          TrueBlocks, LLC provides various levels of support including free online forums, per-incident support, and
          support plans. Choose your poison.
        </div>
      </h1>
      <div>
        <h4>Free Support</h4>
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

export default Support;
