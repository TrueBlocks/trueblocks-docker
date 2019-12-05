import React from 'react';
import ConnectionComponent from '../common/connection-status';

const Scraper = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <div className="inner-panel">
      <h1>
        Scraper
        <div className="description-note">
          This is the TrueBlocks scraper which extracts the index and the data columns
        </div>
      </h1>
    </div>
  </div>
);

export default Scraper;
