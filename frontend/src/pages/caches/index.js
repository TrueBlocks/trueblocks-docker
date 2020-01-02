import React from 'react';
import Page from '../../components/page';
import CachesInner from './inner';

//----------------------------------------------------------------------
class Caches extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || 'status/modes=caches&types=all';
    params = params.replace('subpage=', '').replace('-', '/');  // weird cleanup
    return <CachesInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Caches;