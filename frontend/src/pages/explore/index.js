import React from 'react';
import Page from '../../components/page';
import ExploreInner from './inner';

//----------------------------------------------------------------------
class Explore extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || 'blocks/blocks=latest&hashes_only';
    params = params.replace('subpage=', '').replace('-', '/');  // weird cleanup
    return <ExploreInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Explore;