import React from 'react';
import Page from '../../components/page';
import ExploreInner from './explore-inner';

//----------------------------------------------------------------------
var Explore = (props) => {
  var subpage = props.match.params.subpage ? props.match.params.subpage : 'explore/accounts';
  var inner = <ExploreInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Explore;