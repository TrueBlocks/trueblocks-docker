import React from 'react';
import Page from '../../components/page';
import ExploreInner from './inner';

//----------------------------------------------------------------------
class Explore extends React.Component {
  getInner = () => {
    var subpage = 'explore/' + (this.props.match.params.subpage || 'accounts');
    return <ExploreInner subpage={subpage} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Explore;