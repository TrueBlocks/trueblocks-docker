import React from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import IndiciesInner from './inner';
import { dispatcher_Indicies, indicies_menu } from './dispatchers';

//----------------------------------------------------------------------
class Indicies extends React.Component {
  getInner = () => {
    var params = this.props.match.params.query ? this.props.match.params.query.replace('-', '/') : '';
    return <IndiciesInner subpage={params} match={this.props.match} />;
  };

  getHelp = () => {
    return (
      <HelpPanel>
        TrueBlocks index of appearances greatly speed up access to the Ethereum data; however, they take up a lot of
        space on your hard drive, so you have to keep any eye on them. Clean them out periodically so they don't get too
        big.
      </HelpPanel>
    );
  };

  render = () => {
    return <Page inner={this.getInner()} help={this.getHelp()} />;
  };
}
export default Indicies;
export { dispatcher_Indicies, indicies_menu };
