import React from 'react';
import Page from '../../components/page';
import CachesInner from './inner';

//----------------------------------------------------------------------
var Caches = (props) => {
  var subpage = 'caches/' + (props.match.params.subpage || 'all');
  var inner = <CachesInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Caches;
