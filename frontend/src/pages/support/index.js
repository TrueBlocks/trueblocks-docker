import React from 'react';
import Page from '../../components/page';
import SupportInner from './inner';

//----------------------------------------------------------------------
class Support extends React.Component {
  getInner = () => {
    var subpage = 'support/' + (this.props.match.params.subpage || 'pay');
    return <SupportInner subpage={subpage} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Support;