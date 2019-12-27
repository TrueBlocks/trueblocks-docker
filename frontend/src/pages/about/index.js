import React from 'react';
import Page from '../../components/page';
import AboutInner from './about-inner';

//----------------------------------------------------------------------
var About = (props) => {
  var subpage = 'about/' + (props.match.params.subpage || 'team');
  var inner = <AboutInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default About;