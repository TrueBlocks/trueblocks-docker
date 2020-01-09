import React from 'react';
import Page from '../../components/page';
import SupportInner from './inner';
import { dispatcher_Support, support_menu } from './dispatchers';

//----------------------------------------------------------------------
class Support extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || 'support/free';
    params = params.replace('subpage=', '').replace('-', '/'); // weird cleanup
    return <SupportInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Support;
export { dispatcher_Support, support_menu };