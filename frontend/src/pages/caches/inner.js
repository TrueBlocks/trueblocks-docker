//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Caches } from './dispatchers';

import { isError, NotReady, isEmpty, EmptyQuery } from '../../components';
import { isReady } from '../../components';
import { DataTable } from '../../components';
import * as utils from '../../utils';
import './caches.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class CachesInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_submenu: props.cur_submenu
    };
    // EXISTING_CODE
    // EXISTING_CODE
  }

  componentDidMount = () => {
    this.props.dispatcher_Caches(this.state.cur_submenu.route + '?' + this.state.cur_submenu.query);
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerPage = () => {
    if (isError(this.props)) return <NotReady {...this.props} />;
    else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    // EXISTING_CODE
    return <DataTable subpage="caches" data={this.props.data} />;
  };

  render = () => {
    return (
      <Fragment>
        <div className="inner-panel">
          <div className="title inner-page">{utils.breadCrumb('Caches', this.state.cur_submenu)}</div>
          {this.getInnerPage()}
        </div>
      </Fragment>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Status, reducer_Caches }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_Status.isConnected,
  sysError: reducer_Status.error,
  isLoading: reducer_Caches.isLoading,
  error: reducer_Caches.error,
  data: reducer_Caches.data,
  meta: reducer_Caches.meta
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_Caches
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CachesInner);