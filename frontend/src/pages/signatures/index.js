import React from 'react';
import Page from '../../components/page';
import SignaturesInner from './inner';
import { dispatcher_Signatures, signatures_menu } from './dispatchers';

//----------------------------------------------------------------------
class Signatures extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || 'abi/monitored&verbose';
    params = params.replace('subpage=', '').replace('-', '/'); // weird cleanup
    return <SignaturesInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Signatures;
export { dispatcher_Signatures, signatures_menu };