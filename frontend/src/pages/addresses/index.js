import React from 'react';
import Page from '../../components/page';
import AddressesInner from './inner';

//----------------------------------------------------------------------
class Addresses extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || 'status/modes=monitors&details&ether';
    params = params.replace('subpage=', '').replace('-', '/');  // weird cleanup
    return <AddressesInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Addresses;