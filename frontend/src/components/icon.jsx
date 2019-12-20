import React, { Component } from 'react';
import PropTypes from 'prop-types';

//----------------------------------------------------------------------
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

//----------------------------------------------------------------------
Icon.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
