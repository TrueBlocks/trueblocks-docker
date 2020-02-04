//----------------------------------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Explore } from './dispatchers';

import { BreadCrumb } from '../../components';
import { isError, NotReady, isEmpty, EmptyQuery } from '../../components';
import { isReady } from '../../components';
import { DataTableObject } from '../../components';
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
    if (this.state.cur_submenu.subpage === 'dashboard') return <div>The dashboard for Explore</div>;
    if (isError(this.props)) return <NotReady {...this.props} />;
    else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <DataTableObject
        subpage="explore"
        data={this.props.data[0].result ? this.props.data[0].result : this.props.data[0]}
      />
    );
  };

  render = () => {
    return (
      <div className="inner-panel">
        <BreadCrumb page="Explore" menu={this.state.cur_submenu} />
        {this.getInnerPage()}
        {JSON.stringify(this.state)}
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_SidePanels, reducer_Status, reducer_Explore }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_SidePanels.isStatusExpanded ? reducer_Status.isConnected : true,
  sysError: reducer_SidePanels.isStatusExpanded ? reducer_Status.error : false,
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
export default connect(mapStateToProps, mapDispatchToProps)(ExploreInner);
