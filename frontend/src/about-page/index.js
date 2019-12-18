import React from 'react';
import Connection from '../components';
import AboutInner from './about-inner';

const About = (props) => (
  <div className="page">
    <Connection props={props} />
    <AboutInner props={props} />
  </div>
);

export default About;
