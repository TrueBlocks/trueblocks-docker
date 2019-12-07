import React from 'react';
import ConnectionComponent from '../z_components';
import AboutInner from './about-inner';

const About = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <AboutInner props={props} />
  </div>
);

export default About;
