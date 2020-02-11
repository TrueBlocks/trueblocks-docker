//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_[{PROPER}] } from './dispatchers';

import { [{MENU_TYPE}] } from 'components';
import { BreadCrumb } from 'components';
import { Debug } from 'components';
[{NO_DATA}]import { isReady } from 'components';
[{NO_DT}]import { DataTable } from 'components';
[{NO_OBJ}]import { ObjectTable } from 'components';
[{NO_ERROR}]import { isError, NotReady, isEmpty, EmptyQuery } from 'components';
[{NO_TEXT}][{TEXT_IMPORTS}]
[{NO_TEXT}][{TEXT_ACTIONS}]
[{MENU_COMMENT}]import { [{LOWER}]_menu } from './';
import './[{LOWER}].css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class [{PROPER}]Inner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_submenu: props.cur_submenu
    };
    // EXISTING_CODE
    // EXISTING_CODE
  }

  componentDidMount = () => {
    this.props.dispatcher_[{PROPER}](this.state.cur_submenu.route + '?' + this.state.cur_submenu.query);
  };

  // EXISTING_CODE
  // EXISTING_CODE

  pageEar = (cmd, arg) => {
    // EXISTING_CODE
    // EXISTING_CODE
  };

  getInnerPage = () => {
    [{NO_DASH}]if (this.state.cur_submenu.subpage === 'dashboard') return <div>The dashboard for [{PROPER}]</div>;
    [{NO_TEXT}][{TEXT_CODE}]
    [{NO_ERROR}]if (isError(this.props)) return <NotReady {...this.props} />;
    [{NO_DATA}]else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    [{NO_ERROR}]else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    // EXISTING_CODE
    [{NO_DT}]return (
    [{NO_DT}]  <DataTable
    [{NO_DT}]    displayMap={displayMap}
    [{NO_DT}]    theFields={this.props.fieldList}
    [{NO_DT}]    theData={this.props.data}
    [{NO_DT}]    headerIcons={['add']}
    [{NO_DT}]    icons={['explore', 'refresh', 'explore|remove', 'delete|undo']}
    [{NO_DT}]    pageEar={this.pageEar}
    [{NO_DT}]  />
    [{NO_DT}]);
    [{NO_OBJ}]return (
    [{NO_OBJ}]  <ObjectTable
    [{NO_OBJ}]    title={'[{PROPER}]: ' + this.state.cur_submenu}
    [{NO_OBJ}]    theFields={this.props.fieldList}
    [{NO_OBJ}]    object={object}
    [{NO_OBJ}]    pageEar={this.pageEar}
    [{NO_OBJ}]  />
    [{NO_OBJ}]);
  };

  render = () => {
    return (
      <div className="inner-panel">
        <BreadCrumb page="[{PROPER}]" menu={this.state.cur_submenu} />
        {this.getInnerPage()}
        <Debug state={this.state} fieldList={this.props.fieldList} />
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Panels, reducer_Status, reducer_[{PROPER}] }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_Panels.isStatusExpanded ? reducer_Status.isConnected : true,
  sysError: reducer_Panels.isStatusExpanded ? reducer_Status.error : false,
  isLoading: reducer_[{PROPER}].isLoading,
  error: reducer_[{PROPER}].error,
  fieldList: reducer_[{PROPER}].fieldList,
  data: reducer_[{PROPER}].data,
  meta: reducer_[{PROPER}].meta
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_[{PROPER}]
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)([{PROPER}]Inner);
