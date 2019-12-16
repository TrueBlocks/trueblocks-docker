import React, { Component } from 'react';

export default class Icon extends Component {
  render() {
    var title = this.props.title || this.props.icon;
    return (
      <i className="material-icons md-20" onClick={this.props.onClick} title={title}>
        {this.props.icon}
      </i>
    );
  }
}
