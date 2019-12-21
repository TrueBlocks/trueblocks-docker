import React from 'react';
import Page from '../../components/page';
import [{PROPER}]Inner from './[{LONG}]-inner';

//----------------------------------------------------------------------
var [{PROPER}] = (props) => {
  var subpage = props.match.params.subpage ? props.match.params.subpage : '[{LONG}]/[{SUBPAGE}]';
  var inner = <[{PROPER}]Inner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default [{PROPER}];
