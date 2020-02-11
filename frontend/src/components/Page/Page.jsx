import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './Page.css';

//----------------------------------------------------------------------
class Page extends React.Component {
  render = () => {
    return <Fragment>{this.props.inner}</Fragment>;
  };

  static propTypes = {
    inner: PropTypes.element.isRequired
  };
}

//------------------------------------------------------------
export default Page;
