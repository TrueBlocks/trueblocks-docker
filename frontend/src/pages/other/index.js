import React from 'react';
import Page from '../../components/page';
import OtherInner from './inner';

//----------------------------------------------------------------------
class Other extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || 'other/custom';
    params = params.replace('subpage=', '').replace('-', '/');  // weird cleanup
    return <OtherInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Other;