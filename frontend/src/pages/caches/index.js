import React from 'react';
import Page from '../../components/page';
import CachesInner from './inner';
import { dispatcher_Caches, caches_menu } from './dispatchers';

//----------------------------------------------------------------------
class Caches extends React.Component {
  getInner = () => {
    var params = this.props.match.params.query ? this.props.match.params.query.replace('-', '/') : '';
    return <CachesInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Caches;
export { dispatcher_Caches, caches_menu };