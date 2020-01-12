import React from 'react';
import Page from '../../components/page';
import OtherInner from './inner';
import { dispatcher_Other, other_menu } from './dispatchers';

//----------------------------------------------------------------------
class Other extends React.Component {
  getInner = () => {
    var params = this.props.match.params.query ? this.props.match.params.query.replace('-', '/') : '';
    return <OtherInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Other;
export { dispatcher_Other, other_menu };