//----------------------------------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Signatures } from './dispatchers';

import { BreadCrumb } from '../../components';
import { isError, NotReady, isEmpty, EmptyQuery } from '../../components';
import { isReady } from '../../components';
import { DataTable } from '../../components';
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
    // EXISTING_CODE
    // EXISTING_CODE
  }

  componentDidMount = () => {
    this.props.dispatcher_Signatures(this.state.cur_submenu.route + '?' + this.state.cur_submenu.query);
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerPage = () => {
    if (this.state.cur_submenu.subpage === 'dashboard') return <div>The dashboard for Signatures</div>;
    if (isError(this.props)) return <NotReady {...this.props} />;
    else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    // EXISTING_CODE
    return <DataTable fields={null} rows={this.props.data} innerEar={null} />;
  };

  render = () => {
    return (
      <div className="inner-panel">
        <BreadCrumb page="Signatures" menu={this.state.cur_submenu} />
        {this.getInnerPage()}
        {JSON.stringify(this.state)}
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_SidePanels, reducer_Status, reducer_Signatures }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_SidePanels.isStatusExpanded ? reducer_Status.isConnected : true,
  sysError: reducer_SidePanels.isStatusExpanded ? reducer_Status.error : false,
  isLoading: reducer_Signatures.isLoading,
  error: reducer_Signatures.error,
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
