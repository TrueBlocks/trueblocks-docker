//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_[{PROPER}] } from './dispatchers';

import { [{MENU_TYPE}] } from '../../components';
[{NO_ERROR}]import { isError, NotReady, isEmpty, EmptyQuery } from '../../components';
[{NO_DATA}]import { isReady } from '../../components';
[{NO_DT}]import { [{DT_TYPE}] } from '../../components';
[{NO_TEXT}][{TEXT_IMPORTS}]
[{NO_TEXT}][{TEXT_ACTIONS}]
import * as utils from '../../utils';
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
      this.props.dispatcher_[{PROPER}](submenu.route + '?' + submenu.query);
      return;
    }

    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
[{NO_TEXT}][{TEXT_CODE}]
    [{NO_ERROR}]if (isError(this.props)) return <NotReady {...this.props} />;
    [{NO_DATA}]else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    [{NO_ERROR}]else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    // EXISTING_CODE
    [{NO_DT}]return <[{DT_TYPE}] subpage="[{LOWER}]" data={this.props.data} innerEar={this.innerEar} />;
  };

  getInnerPage = () => {
    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <Fragment>
        <[{MENU_TYPE}] data={[{LOWER}]_menu} active={this.state.subpage} [{MENU_CLICK}] />
        {this.getInnerMost()}
      </Fragment>
    );
  };

  render = () => {
    return (
      <Fragment>
        <div className="inner-panel">
          <div className="title inner-page">{utils.breadCrumb('[{PROPER}]', this.state.cur_submenu)}</div>
          {this.getInnerPage()}
        </div>
      </Fragment>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)([{PROPER}]Inner);
