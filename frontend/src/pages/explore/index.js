import React from 'react';
import Page from '../../components/page';
import ExploreInner from './inner';
import { dispatcher_Explore, explore_menu } from './dispatchers';

//----------------------------------------------------------------------
class Explore extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || 'status/modes=monitors&details&ether';
    params = params.replace('subpage=', '').replace('-', '/'); // weird cleanup
    return <ExploreInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Explore;
export { dispatcher_Explore, explore_menu };