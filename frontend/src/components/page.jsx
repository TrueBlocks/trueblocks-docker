import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Status } from './';

//----------------------------------------------------------------------
export default class Page extends React.Component {
  render = () => {
    return (
      <Fragment>
        <Status {...this.props} />
        {this.props.inner}
      </Fragment>
    );
  };

  static propTypes = {
    inner: PropTypes.element.isRequired
  };
}
