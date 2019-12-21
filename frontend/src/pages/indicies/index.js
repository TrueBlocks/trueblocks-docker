import React from 'react';
import Page from '../../components/page';
import IndiciesInner from './indicies-inner';

//----------------------------------------------------------------------
var Indicies = (props) => {
  var subpage = props.match.params.subpage ? props.match.params.subpage : 'indicies/full';
  var inner = <IndiciesInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Indicies;