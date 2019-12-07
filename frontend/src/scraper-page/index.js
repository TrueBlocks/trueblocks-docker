import React from 'react';
import ConnectionComponent from '../z_components';
import ScraperInner from './scraper-inner';

const Scraper = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <ScraperInner props={props} />
  </div>
);

export default Scraper;
