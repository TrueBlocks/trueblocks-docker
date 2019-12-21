import React from 'react';
import Page from '../../components/page';
import SupportInner from './support-inner';

//----------------------------------------------------------------------
var Support = (props) => {
  var subpage = props.match.params.subpage ? props.match.params.subpage : 'support/pay';
  var inner = <SupportInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Support;