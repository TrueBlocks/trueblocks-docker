//----------------------------------------------------------------------
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Icon.css';

//----------------------------------------------------------------------
export class Icon extends Component {
  render() {
    const title = this.props.title || this.props.icon;
    const size = this.props.small
      ? 'md-small'
      : this.props.large
      ? 'md-large'
      : this.props.midsize
      ? 'md-midsize'
      : 'md-regular';
    let cn = 'material-icons ' + size + ' ' + this.props.color;
    if (this.props.bordered) cn += ' bordered';
    return (
      <i className={cn} onClick={this.props.onClick} title={title}>
        {this.props.icon}
      </i>
    );
  }

  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func
  };
}

//----------------------------------------------------------------------
export function SortIcon({ field, sortedBy, sortDir, color }) {
  if (field !== sortedBy) return <Icon midsize invisible />;
  if (sortDir) return <Icon midsize icon="arrow_drop_down" color={color} title="ascending" />;
  return <Icon midsize icon="arrow_drop_up" color={color} title="descending" />;
}
