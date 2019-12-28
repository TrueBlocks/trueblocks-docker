import React from 'react';
import Page from '../../components/page';
import AboutInner from './inner';

//----------------------------------------------------------------------
class About extends React.Component {
  getInner = () => {
    var subpage = 'about/' + (this.props.match.params.subpage || 'team');
    return <AboutInner subpage={subpage} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default About;