import React from 'react';
import Page from '../../components/page';
import SignaturesInner from './signatures-inner';

//----------------------------------------------------------------------
var Signatures = (props) => {
  var subpage = props.match.params.subpage ? props.match.params.subpage : 'signatures/monitors';
  var inner = <SignaturesInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Signatures;