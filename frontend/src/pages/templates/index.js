import React from 'react';
import Page from '../../components/page';
import [{PROPER}]Inner from './[{LONG}]-inner';

//----------------------------------------------------------------------
var [{PROPER}] = (props) => {
  var subpage = '[{LONG}]/' + (props.match.params.subpage || '[{SUBPAGE}]');
  var inner = <[{PROPER}]Inner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default [{PROPER}];
