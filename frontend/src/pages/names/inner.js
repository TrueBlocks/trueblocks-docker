//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Names } from './dispatchers';

import { BreadCrumb } from 'components';
import { Debug } from 'components';
import { isReady } from 'components';
import { DataTable } from 'components';
import { isError, NotReady, isEmpty, EmptyQuery } from 'components';
import './names.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class NamesInner extends React.Component {
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
    this.props.dispatcher_Names(this.state.cur_submenu.route + '?' + this.state.cur_submenu.query);
  };

  // EXISTING_CODE
  // EXISTING_CODE

  tableEar = (cmd, arg) => {
    // EXISTING_CODE
    // EXISTING_CODE
  };

  getInnerPage = () => {
    if (this.state.cur_submenu.subpage === 'dashboard') return <div>The dashboard for Names</div>;
    if (isError(this.props)) return <NotReady {...this.props} />;
    else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    let displayMap = new Map();
    // EXISTING_CODE
    if (this.state.cur_submenu.subpage.includes('_blocks')) {
      displayMap.set('blockNumber', { showing: true });
      displayMap.set('timestamp', { showing: true });
      displayMap.set('name', { showing: true });
      displayMap.set('date', { showing: true });
    } else if (this.state.cur_submenu.subpage === 'groups') {
      displayMap.set('group', { showing: true, name: 'Sort 1' });
    } else if (this.state.cur_submenu.route === 'abi') {
      displayMap.set('name', { showing: true });
      displayMap.set('type', { showing: true });
      displayMap.set('signature', { showing: true });
      displayMap.set('encoding', { showing: true });
      displayMap.set('inputs', { showing: true });
      displayMap.set('outputs', { showing: true });
    } else if (this.state.cur_submenu.subpage !== 'monitors') {
      displayMap.set('group', { showing: true });
      displayMap.set('name', { showing: true });
      displayMap.set('address', { showing: true });
      displayMap.set('symbol', { showing: true });
      displayMap.set('source', { showing: true });
      displayMap.set('logo', { showing: true });
      displayMap.set('description', { showing: true });
    } else {
      displayMap.set('group', { showing: true });
      displayMap.set('name', { showing: true });
      displayMap.set('address', { showing: true });
      displayMap.set('nAppearances', { showing: true, name: 'Count' });
      displayMap.set('firstAppearance', { showing: true, name: 'First' });
      displayMap.set('latestAppearance', { showing: true, name: 'Latest' });
      displayMap.set('appearanceRange', { showing: true, name: 'Range' });
      displayMap.set('appearanceInterval', { showing: true, name: 'Interval' });
      displayMap.set('sizeInBytes', { showing: true, name: 'Size' });
      displayMap.set('curEther', { showing: true, name: 'Balance' });
    }
    // EXISTING_CODE
    return (
      <DataTable
        displayMap={displayMap}
        theFields={this.props.fieldList}
        theData={this.props.data}
        headerIcons={['add']}
        icons={['explore', 'refresh', 'explore|remove', 'delete|undo']}
        tableEar={this.tableEar}
      />
    );
  };

  render = () => {
    return (
      <div className="inner-panel">
        <BreadCrumb page="Names" menu={this.state.cur_submenu} />
        {this.getInnerPage()}
        {localStorage.getItem('debug') ? (
          <Debug state={this.state} fieldList={this.props.fieldList} meta={this.props.meta} />
        ) : (
          <Fragment></Fragment>
        )}
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ router, reducer_Panels, reducer_Status, reducer_Names }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  location: router.location,
  sysConnected: reducer_Panels.isStatusExpanded ? reducer_Status.isConnected : true,
  sysError: reducer_Panels.isStatusExpanded ? reducer_Status.error : false,
  isLoading: reducer_Names.isLoading,
  error: reducer_Names.error,
  fieldList: reducer_Names.fieldList,
  data: reducer_Names.data,
  meta: reducer_Names.meta
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_Names
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(NamesInner);
