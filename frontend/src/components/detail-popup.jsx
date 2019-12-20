//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import Icon from './icon';
import './detail-popup.css';

//----------------------------------------------------------------------
export default class DetailPopup extends React.Component {
  render = () => {
    return (
      <div className="popup">
        <PopIconRow prompt="Address:" value={this.props.item.address} ear={this.props.ear} />
        <PopTextRow prompt="Group:" value={this.props.item.group} />
        <PopTextRow prompt="Subgroup:" value={this.props.item.subgroup} />
        <PopTextRow prompt="Name:" value={this.props.item.name} />
        <PopTextRow prompt="Symbol:" value={this.props.item.symbol} />
        <PopTextRow prompt="Description:" value={this.props.item.description} />
        <PopTextRow prompt="Source:" value={this.props.item.source} />
        <PopTextRow prompt="Logo:" value={this.props.item.logo} />
        <PopTextRow prompt="isContract:" value={this.props.item.is_contract} />
        <PopTextRow prompt="isPrivate:" value={this.props.item.is_private} />
        <PopTextRow prompt="isShared:" value={this.props.item.is_shared} />
      </div>
    );
  };
}

//----------------------------------------------------------------------
DetailPopup.propTypes = {
  item: PropTypes.object.isRequired,
  ear: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired
};

//----------------------------------------------------------------------
class PopIconRow extends React.Component {
  monitorClicked = () => {
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
          <Icon icon="library_add" title="add monitor" onClick={this.monitorClicked} />
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
PopIconRow.propTypes = {
  prompt: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  ear: PropTypes.func.isRequired
};

//----------------------------------------------------------------------
class PopTextRow extends React.Component {
  render = () => {
    return (
      <div className="np_rt2">
        <div className="np_rt2_c1">{this.props.prompt}</div>
        <div className="np_rt2_c2">{this.props.value}</div>
      </div>
    );
  };
}

//----------------------------------------------------------------------
PopTextRow.propTypes = {
  prompt: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
};
