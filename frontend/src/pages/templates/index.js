import React from 'react';
import Page from '../../components/page';
import [{PROPER}]Inner from './inner';

//----------------------------------------------------------------------
class [{PROPER}] extends React.Component {
  getInner = () => {
    var subpage = '[{LONG}]/' + (this.props.match.params.subpage || '[{SUBPAGE}]');
    return <[{PROPER}]Inner subpage={subpage} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default [{PROPER}];
