import React from 'react';

import {
  addActionListener,
  removeListener
} from '../websocket';

import './Progress.css';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0
    };

    this.listener = this.setupSocket();
  }

  setupSocket() {
    return addActionListener('progress', ({ id, progress }) => {
      if (id !== this.props.id) return;

      this.setState({
        progress
      });
    });
  }

  componentWillUnmount() {
    removeListener(this.listener);
  }

  render() {
    return (
      <div className={`progress-wrapper ${this.props.className}`}>
        <progress max="100" value={this.state.progress}></progress>
      </div>
    );
  }
}
