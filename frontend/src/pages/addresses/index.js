import React from 'react';
import Page from '../../components/page';
import AddressesInner from './inner';

//----------------------------------------------------------------------
class Addresses extends React.Component {
  getInner = () => {
    var subpage = 'addresses/' + (this.props.match.params.subpage || 'custom');
    return <AddressesInner subpage={subpage} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Addresses;