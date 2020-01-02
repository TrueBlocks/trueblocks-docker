import React from 'react';
import Page from '../../components/page';
import SupportInner from './inner';

//----------------------------------------------------------------------
class Support extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || 'support/free';
    params = params.replace('subpage=', '').replace('-', '/');  // weird cleanup
    return <SupportInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Support;