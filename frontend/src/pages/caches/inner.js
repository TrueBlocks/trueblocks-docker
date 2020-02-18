//----------------------------------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Caches } from './dispatchers';

import { BreadCrumb } from 'components';
import { Debug } from 'components';
import { isReady } from 'components';
import { ObjectTable } from 'components';
import { isError, NotReady, isEmpty, EmptyQuery } from 'components';
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
    this.tableEar = this.tableEar.bind(this);
    // EXISTING_CODE
    // EXISTING_CODE
  }

  componentDidMount = () => {
    this.props.dispatcher_Caches(this.state.cur_submenu.route + '?' + this.state.cur_submenu.query);
  };

  // EXISTING_CODE
  // EXISTING_CODE

  tableEar = (cmd, arg) => {
    // EXISTING_CODE
    // EXISTING_CODE
  };

  getInnerPage = () => {
    if (this.state.cur_submenu.subpage === 'dashboard') return <div>The dashboard for Caches</div>;
    if (isError(this.props)) return <NotReady {...this.props} />;
    else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    let object = this.props.data[0].result ? this.props.data[0].result : this.props.data[0];
    // EXISTING_CODE
    return (
      <ObjectTable
        title={'Caches: ' + this.state.cur_submenu}
        theFields={this.props.fieldList}
        object={object}
        tableEar={this.tableEar}
      />
    );
  };

  render = () => {
    return (
      <div className="inner-panel">
        <BreadCrumb page="Caches" menu={this.state.cur_submenu} />
        {this.getInnerPage()}
        <Debug state={this.state} fieldList={this.props.fieldList} meta={this.props.meta} />
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ router, reducer_Panels, reducer_Status, reducer_Caches }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  location: router.location,
  sysConnected: reducer_Panels.isStatusExpanded ? reducer_Status.isConnected : true,
  sysError: reducer_Panels.isStatusExpanded ? reducer_Status.error : false,
  isLoading: reducer_Caches.isLoading,
  error: reducer_Caches.error,
  fieldList: reducer_Caches.fieldList,
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
export default connect(mapStateToProps, mapDispatchToProps)(CachesInner);
