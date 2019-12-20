//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import Proptypes from 'prop-types';
import Popup from './popup';
import Icon from './icon';

//----------------------------------------------------------------------
export default class NamePopup extends Popup {
  render = () => {
    if (!this.props.item) {
      return <Fragment></Fragment>;
    }

    return (
      <div className="popup">
        <NamePopup3Row prompt="Address:" value={this.props.item.address} ear={this.props.ear} />
        <NamePopup2Row prompt="Group:" value={this.props.item.group} />
        <NamePopup2Row prompt="Subgroup:" value={this.props.item.subgroup} />
        <NamePopup2Row prompt="Name:" value={this.props.item.name} />
        <NamePopup2Row prompt="Symbol:" value={this.props.item.symbol} />
        <NamePopup2Row prompt="Description:" value={this.props.item.description} />
        <NamePopup2Row prompt="Source:" value={this.props.item.source} />
        <NamePopup2Row prompt="Logo:" value={this.props.item.logo} />
        <NamePopup2Row prompt="isContract:" value={this.props.item.is_contract} />
        <NamePopup2Row prompt="isPrivate:" value={this.props.item.is_private} />
        <NamePopup2Row prompt="isShared:" value={this.props.item.is_shared} />
      </div>
    );
  };
}

//----------------------------------------------------------------------
class NamePopup3Row extends React.Component {
  addMonitorClicked = () => {
    this.props.ear('monitor', this.props.value);
  };

  exploreClicked = () => {
    this.props.ear('explore', this.props.value);
  };

  shareClicked = () => {
    this.props.ear('share', this.props.value);
  };

  deleteClicked = () => {
    this.props.ear('delete', this.props.value);
  };

  editClicked = () => {
    this.props.ear('edit', this.props.value);
  };

  render = () => {
    return (
      <div className="np_rt3">
        <div className="np_rt3_c1">{this.props.prompt}</div>
        <div className="np_rt3_c2">{this.props.value}</div>
        <div className="np_rt3_c3">
          <Icon icon="library_add" title="add monitor" onClick={this.addMonitorClicked} />
          <Icon icon="list_alt" title="explore" onClick={this.exploreClicked} />
          <Icon icon="share" onClick={this.shareClicked} />
          <Icon icon="delete" onClick={this.deleteClicked} />
          <Icon icon="edit" onClick={this.editClicked} />
        </div>
      </div>
    );
  };
}

//----------------------------------------------------------------------
class NamePopup2Row extends React.Component {
  render = () => {
    return (
      <div className="np_rt2">
        <div className="np_rt2_c1">{this.props.prompt}</div>
        <div className="np_rt2_c2">{this.props.value}</div>
      </div>
    );
  };
}
