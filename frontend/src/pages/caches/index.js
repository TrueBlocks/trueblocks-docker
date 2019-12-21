import React from 'react';
import Page from '../../components/page';
import CachesInner from './caches-inner';

//----------------------------------------------------------------------
var Caches = (props) => {
  var subpage = props.match.params.subpage ? props.match.params.subpage : 'caches/overview';
  var inner = <CachesInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Caches;