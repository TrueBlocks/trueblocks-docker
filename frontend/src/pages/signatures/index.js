import React from 'react';
import Page from '../../components/page';
import SignaturesInner from './signatures-inner';

//----------------------------------------------------------------------
var Signatures = (props) => {
  var subpage = 'signatures/' + (props.match.params.subpage || 'monitors');
  var inner = <SignaturesInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Signatures;