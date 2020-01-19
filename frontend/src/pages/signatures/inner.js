//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Signatures } from './dispatchers';

import { isError, NotReady, isEmpty, EmptyQuery } from '../../components';
import { isReady } from '../../components';
import { DataTable } from '../../components';
import * as utils from '../../utils';
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
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  // EXISTING_CODE

  componentWillMount = () => {};

  componentDidMount = () => {
    this.innerEar('change_subpage', this.state.cur_submenu);
  };

  innerEar = (cmd, submenu) => {
    if (cmd === 'change_subpage') {
      // update the local state...
      this.setState({
        cur_submenu: submenu
      });
      // update the global state...
      this.props.dispatcher_Signatures(submenu.route + '?' + submenu.query);
      return;
    }

    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
    if (isError(this.props)) return <NotReady {...this.props} />;
    else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    // EXISTING_CODE
    return <DataTable subpage="signatures" data={this.props.data} innerEar={this.innerEar} />;
  };

  getInnerPage = () => {
    // EXISTING_CODE
    // EXISTING_CODE
    return <Fragment>{this.getInnerMost()}</Fragment>;
  };

  render = () => {
    return (
      <Fragment>
        <div className="inner-panel">
          <div className="title inner-page">{utils.breadCrumb('Signatures', this.state.cur_submenu)}</div>
          {this.getInnerPage()}
        </div>
      </Fragment>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Status, reducer_Signatures }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_Status.isConnected,
  sysError: reducer_Status.error,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignaturesInner);