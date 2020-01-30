//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_[{PROPER}] } from './dispatchers';

import { [{MENU_TYPE}] } from '../../components';
import { BreadCrumb } from '../../components';
[{NO_ERROR}]import { isError, NotReady, isEmpty, EmptyQuery } from '../../components';
[{NO_DATA}]import { isReady } from '../../components';
[{NO_DT}]import { [{DT_TYPE}] } from '../../components';
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

  getInnerPage = () => {
    [{NO_DASH}]if (this.state.cur_submenu.subpage === 'dashboard') return <div>The dashboard for [{PROPER}]</div>;
[{NO_TEXT}][{TEXT_CODE}]
    [{NO_ERROR}]if (isError(this.props)) return <NotReady {...this.props} />;
    [{NO_DATA}]else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    [{NO_ERROR}]else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    // EXISTING_CODE
    [{NO_DT}]return <[{DT_TYPE}] subpage="[{LOWER}]" data={this.props.data} [IE]/>;
  };

  render = () => {
    return (
      <div className="inner-panel">
        <BreadCrumb page="[{PROPER}]" menu={this.state.cur_submenu} />
        {this.getInnerPage()}
        {JSON.stringify(this.state)}
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Status, reducer_[{PROPER}] }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_Status.isConnected,
  sysError: reducer_Status.error,
  isLoading: reducer_[{PROPER}].isLoading,
  error: reducer_[{PROPER}].error,
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
