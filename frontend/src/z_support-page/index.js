import React from 'react';
import ConnectionComponent from '../z_components';
import SupportInner from './support-inner';

/**
 * SupportPage - a componet carrying responsibility for the Support page
 * @param  props - properties passed to the component
 */
const SupportPage = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <SupportInner props={props} />
  </div>
);

export default SupportPage;
