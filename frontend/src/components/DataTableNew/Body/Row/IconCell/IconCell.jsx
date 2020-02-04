//----------------------------------------------------------------------
import React from 'react';
//import PropTypes from 'prop-types';
import { Icon } from '../../../../Icon';

//---------------------------------------------------------------------
class IconCell extends React.Component {
  refreshClicked = () => {
    this.props.rowEar('refresh', this.props.content);
  };

  exploreClicked = () => {
    const url = '/explore/accounts/' + this.props.content;
    window.open(url, '_self');
  };

  removeClicked = () => {
    this.props.rowEar('remove', this.props.content);
    this.setState(this.state);
  };

  deleteClicked = () => {
    this.props.rowEar('delete', this.props.content);
    this.setState(this.state);
  };

  undoClicked = () => {
    this.props.rowEar('undo', this.props.content);
    this.setState(this.state);
  };

  launchClicked = () => {
    const url = 'https://etherscan.io/address/' + this.props.content;
    window.open(url, '_blank');
  };

  render = () => {
    if (this.props.deleted) {
      return (
        <td style={{ padding: '3px 4px 2px 3px', textAlign: 'center' }}>
          <Icon icon="launch" />
          <Icon icon="refresh" />
          <Icon icon="delete_forever" onClick={this.removeClicked} />
          <Icon icon="undo" onClick={this.undoClicked} />
        </td>
      );
    }

    return (
      <td style={{ padding: '3px 4px 3px 4px', textAlign: 'center' }}>
        <Icon icon="launch" onClick={this.launchClicked} />
        <Icon icon="refresh" onClick={this.refreshClicked} />
        <Icon icon="list_alt" title="explore" onClick={this.exploreClicked} />
        <Icon icon="delete_outline" title="delete" onClick={this.deleteClicked} />
      </td>
    );
  };
}

export default IconCell;
