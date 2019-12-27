import React from 'react';
import PropTypes from 'prop-types';

import { Connection } from './';

//----------------------------------------------------------------------
export default class Page extends React.Component {
  render = () => {
    return (
      <div className="page">
        <Connection {...this.props} />
        {this.props.inner}
      </div>
    );
  };

  static propTypes = {
    inner: PropTypes.element.isRequired
  };
}
