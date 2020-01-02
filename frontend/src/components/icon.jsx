import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './icon.css';

//----------------------------------------------------------------------
export class Icon extends Component {
  render() {
    var title = this.props.title || this.props.icon;
    var size = this.props.small
      ? 'md-small'
      : this.props.large
      ? 'md-large'
      : this.props.midsize
      ? 'md-midsize'
      : 'md-regular';
    return (
      <i className={'material-icons ' + size + ' ' + this.props.color} onClick={this.props.onClick} title={title}>
        {this.props.icon}
      </i>
    );
  }

  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func
  };
}
