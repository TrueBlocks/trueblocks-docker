//----------------------------------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Signatures } from './dispatchers';

import { BreadCrumb } from 'components';
import { Debug } from 'components';
import { isReady } from 'components';
import { DataTable } from 'components';
import { isError, NotReady, isEmpty, EmptyQuery } from 'components';
import './signatures.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class SignaturesInner extends React.Component {
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
    this.props.dispatcher_Signatures(this.state.cur_submenu.route + '?' + this.state.cur_submenu.query);
  };

  // EXISTING_CODE
  // EXISTING_CODE

  tableEar = (cmd, arg) => {
    // EXISTING_CODE
    // EXISTING_CODE
  };

  getInnerPage = () => {
    if (this.state.cur_submenu.subpage === 'dashboard') return <div>The dashboard for Signatures</div>;
    if (isError(this.props)) return <NotReady {...this.props} />;
    else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    const displayMap = new Map();
    displayMap.set('name', { showing: true });
    displayMap.set('type', { showing: true });
    displayMap.set('signature', { showing: true });
    displayMap.set('encoding', { showing: true });
    displayMap.set('inputs', { showing: true });
    displayMap.set('outputs', { showing: true });
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
        <BreadCrumb page="Signatures" menu={this.state.cur_submenu} />
        {this.getInnerPage()}
        <Debug state={this.state} fieldList={this.props.fieldList} meta={this.props.meta} />
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ router, reducer_Panels, reducer_Status, reducer_Signatures }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  location: router.location,
  sysConnected: reducer_Panels.isStatusExpanded ? reducer_Status.isConnected : true,
  sysError: reducer_Panels.isStatusExpanded ? reducer_Status.error : false,
  isLoading: reducer_Signatures.isLoading,
  error: reducer_Signatures.error,
  fieldList: reducer_Signatures.fieldList,
  data: reducer_Signatures.data,
  meta: reducer_Signatures.meta
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_Signatures
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(SignaturesInner);
