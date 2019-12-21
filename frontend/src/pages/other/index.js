import React from 'react';
import Page from '../../components/page';
import OtherInner from './other-inner';

//----------------------------------------------------------------------
var Other = (props) => {
  var subpage = props.match.params.subpage ? props.match.params.subpage : 'other/generated';
  var inner = <OtherInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Other;