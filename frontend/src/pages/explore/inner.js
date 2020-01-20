//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Explore } from './dispatchers';

import { isError, NotReady, isEmpty, EmptyQuery } from '../../components';
import { isReady } from '../../components';
import { ObjectTable } from '../../components';
import * as utils from '../../utils';
import './explore.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class ExploreInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_submenu: props.cur_submenu
    };
    // EXISTING_CODE
    // EXISTING_CODE
  }

  componentDidMount = () => {
    this.props.dispatcher_Explore(this.state.cur_submenu.route + '?' + this.state.cur_submenu.query);
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerPage = () => {
    if (isError(this.props)) return <NotReady {...this.props} />;
    else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    // EXISTING_CODE
    return <ObjectTable subpage="explore" data={this.props.data} />;
  };

  render = () => {
    return (
      <Fragment>
        <div className="inner-panel">
          <div className="title inner-page">{utils.breadCrumb('Explore', this.state.cur_submenu)}</div>
          {this.getInnerPage()}
        </div>
      </Fragment>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Status, reducer_Explore }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_Status.isConnected,
  sysError: reducer_Status.error,
  isLoading: reducer_Explore.isLoading,
  error: reducer_Explore.error,
  data: reducer_Explore.data,
  meta: reducer_Explore.meta
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_Explore
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreInner);