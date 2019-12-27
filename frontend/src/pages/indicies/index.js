import React from 'react';
import Page from '../../components/page';
import IndiciesInner from './indicies-inner';

//----------------------------------------------------------------------
var Indicies = (props) => {
  var subpage = 'indicies/' + (props.match.params.subpage || 'full');
  var inner = <IndiciesInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Indicies;