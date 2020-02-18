//----------------------------------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Digests } from './dispatchers';

import { BreadCrumb } from 'components';
import { Debug } from 'components';
import { isError, NotReady, isEmpty, EmptyQuery } from 'components';
import './digests.css';

// EXISTING_CODE
import DigestChart from './DigestChart';
import '../../index.css';
// EXISTING_CODE

//----------------------------------------------------------------------
class DigestsInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_submenu: props.cur_submenu
    };
    this.tableEar = this.tableEar.bind(this);
    // EXISTING_CODE
    // EXISTING_CODE
  }

  componentDidMount = () => {
    this.props.dispatcher_Digests(this.state.cur_submenu.route + '?' + this.state.cur_submenu.query);
  };

  // EXISTING_CODE
  // EXISTING_CODE

  tableEar = (cmd, arg) => {
    // EXISTING_CODE
    // EXISTING_CODE
  };

  getInnerPage = () => {
    if (this.state.cur_submenu.subpage === 'dashboard') return <div>The dashboard for Digests</div>;
    if (isError(this.props)) return <NotReady {...this.props} />;
    else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    if (!this.props.statusOpen)
      return <div style={{ color: 'red', fontSize: '20px' }}>The status panel needs to be opened</div>;
    return <DigestChart {...this.props} />;
    // EXISTING_CODE
  };

  render = () => {
    return (
      <div className="inner-panel">
        <BreadCrumb page="Digests" menu={this.state.cur_submenu} />
        {this.getInnerPage()}
        <Debug state={this.state} fieldList={this.props.fieldList} meta={this.props.meta} />
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ router, reducer_Panels, reducer_Status, reducer_Digests }) => ({
  // EXISTING_CODE
  caches: reducer_Status.systemData.caches,
  index_path: reducer_Status.systemData.index_path,
  cache_path: reducer_Status.systemData.cache_path,
  unripe: reducer_Status.unripe,
  staging: reducer_Status.staging,
  finalized: reducer_Status.finalized,
  client: reducer_Status.client,
  loadingIndex: reducer_Digests.isLoading,
  statusOpen: reducer_Panels.isStatusExpanded,
  // EXISTING_CODE
  location: router.location,
  sysConnected: reducer_Panels.isStatusExpanded ? reducer_Status.isConnected : true,
  sysError: reducer_Panels.isStatusExpanded ? reducer_Status.error : false,
  isLoading: reducer_Digests.isLoading,
  error: reducer_Digests.error,
  fieldList: reducer_Digests.fieldList,
  data: reducer_Digests.data,
  meta: reducer_Digests.meta
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_Digests
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(DigestsInner);
