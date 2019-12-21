import React from 'react';
import Page from '../../components/page';
import AboutInner from './about-inner';

//----------------------------------------------------------------------
var About = (props) => {
  var subpage = props.match.params.subpage ? props.match.params.subpage : 'about/team';
  var inner = <AboutInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default About;