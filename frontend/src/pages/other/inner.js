//----------------------------------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Other } from './dispatchers';

import { BreadCrumb } from 'components';
import { Debug } from 'components';
import { isReady } from 'components';
import { DataTable } from 'components';
import { isError, NotReady, isEmpty, EmptyQuery } from 'components';
import './other.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class OtherInner extends React.Component {
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
    this.props.dispatcher_Other(this.state.cur_submenu.route + '?' + this.state.cur_submenu.query);
  };

  // EXISTING_CODE
  // EXISTING_CODE

  tableEar = (cmd, arg) => {
    // EXISTING_CODE
    // EXISTING_CODE
  };

  getInnerPage = () => {
    if (this.state.cur_submenu.subpage === 'dashboard') return <div>The dashboard for Other</div>;
    if (isError(this.props)) return <NotReady {...this.props} />;
    else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    const displayMap = new Map();
    let array = [];
    array['groups'] = [
      { field: 'group_sort', name: 'Sort 1', showing: true },
      { field: 'raw_group', name: 'Group', showing: true },
      { field: 'subgroup_sort', name: 'Sort 2', showing: true },
      { field: 'raw_subgroup', name: 'Subgroup', showing: true }
    ];
    array['prices'] = [
      { field: 'timestamp', showing: true },
      { field: 'date', showing: true },
      { field: 'close', name: 'USD', showing: true }
    ];
    array['default'] = [
      { field: 'blockNumber', showing: true },
      { field: 'timestamp', showing: true },
      { field: 'name', showing: true },
      { field: 'date', showing: true }
    ];
    //    const displayMap = new Map();
    if (this.state.cur_submenu.subpage === 'groups') {
      displayMap.set('group', { showing: true, name: 'Sort 1' });
    } else if (this.state.cur_submenu.subpage === 'prices') {
      displayMap.set('timestamp', { showing: true });
      displayMap.set('date', { showing: true });
      displayMap.set('close', { showing: true });
    } else {
      displayMap.set('blockNumber', { showing: true });
      displayMap.set('timestamp', { showing: true });
      displayMap.set('name', { showing: true });
      displayMap.set('date', { showing: true });
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
        <BreadCrumb page="Other" menu={this.state.cur_submenu} />
        {this.getInnerPage()}
        <Debug state={this.state} fieldList={this.props.fieldList} />
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Panels, reducer_Status, reducer_Other }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_Panels.isStatusExpanded ? reducer_Status.isConnected : true,
  sysError: reducer_Panels.isStatusExpanded ? reducer_Status.error : false,
  isLoading: reducer_Other.isLoading,
  error: reducer_Other.error,
  fieldList: reducer_Other.fieldList,
  data: reducer_Other.data,
  meta: reducer_Other.meta
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_Other
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(OtherInner);
