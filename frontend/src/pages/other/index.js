import React from 'react';
import Page from '../../components/page';
import OtherInner from './other-inner';

//----------------------------------------------------------------------
var Other = (props) => {
  var subpage = 'other/' + (props.match.params.subpage || 'generated');
  var inner = <OtherInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Other;