import React, { Fragment } from 'react';
//import PropTypes from 'prop-types';
import { Loading } from './loading';

//----------------------------------------------------------------
export class NotReady extends React.Component {
  render = () => {
    if (this.props.isLoading) {
      return <Loading source="caches" status="loading" message="Loading..." />;
    }

    if (this.props.error) {
      return <Loading source="caches" status="error" message={this.props.error} />;
    }

    if (this.props.sysError) {
      return <Loading source="caches" status="error" message={this.props.sysError} />;
    }

    return <Fragment />;
  };
}

//----------------------------------------------------------------
export const isReady = function(props, other_test) {
  if (!other_test) return false;
  if (props.isLoading) return false;
  if (!props.sysConnected) return false;
  // connected and not loading, so we're not ready if we have an error
  if (props.sysError || props.error) return false;
  return true;
};
