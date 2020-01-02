import React from 'react';
import Page from '../../components/page';
import SignaturesInner from './inner';

//----------------------------------------------------------------------
class Signatures extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || 'signatures/monitored';
    params = params.replace('subpage=', '').replace('-', '/');  // weird cleanup
    return <SignaturesInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Signatures;