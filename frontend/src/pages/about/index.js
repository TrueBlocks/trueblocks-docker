import React from 'react';
import Page from '../../components/page';
import AboutInner from './inner';

//----------------------------------------------------------------------
class About extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || 'about/about';
    params = params.replace('subpage=', '').replace('-', '/');  // weird cleanup
    return <AboutInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default About;