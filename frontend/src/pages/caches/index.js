import React from 'react';
import Page from '../../components/page';
import CachesInner from './inner';

//----------------------------------------------------------------------
class Caches extends React.Component {
  getInner = () => {
    var subpage = 'caches/' + (this.props.match.params.subpage || 'all');
    return <CachesInner subpage={subpage} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Caches;