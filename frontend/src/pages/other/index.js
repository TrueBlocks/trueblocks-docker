import React from 'react';
import Page from '../../components/page';
import OtherInner from './inner';

//----------------------------------------------------------------------
class Other extends React.Component {
  getInner = () => {
    var subpage = 'other/' + (this.props.match.params.subpage || 'generated');
    return <OtherInner subpage={subpage} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Other;