import React from 'react';
import Page from '../../components/page';
import SignaturesInner from './inner';

//----------------------------------------------------------------------
class Signatures extends React.Component {
  getInner = () => {
    var subpage = 'signatures/' + (this.props.match.params.subpage || 'monitors');
    return <SignaturesInner subpage={subpage} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Signatures;