//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_[{PROPER}] } from './dispatchers';

import { InnerPageHeader, DetailTable, [{MENU_TYPE}], isReady, NotReady } from '../../components';
import { [{LONG}]_local_menu } from '../../fake_data/summary-data';
import './[{LONG}].css';


// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class [{PROPER}]Inner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subpage: props.subpage
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  // EXISTING_CODE

  componentWillMount = () => {};

  componentDidMount = () => {
    this.innerEar('change_subpage', this.props.subpage);
  };

  innerEar = (cmd, value) => {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');
    if (cmd === 'change_subpage') {
      // update the local state...
      this.setState({
        subpage: value
      });
      // update the global state...
      // var query = 'modes=[{LONG}]&types=' + value.replace('[{LONG}]/', '');
      // this.props.dispatcher_[{PROPER}](query);
    }
    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
    // EXISTING_CODE
    // EXISTING_CODE
    // return <DetailTable css_pre="[{LONG}]" data={this.props.data} innerEar={this.innerEar} />;
  };

  getInnerPage = () => {
    // if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;

    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <Fragment>
        <LocalMenu data={[{LONG}]_local_menu} active={this.state.subpage} innerEar={this.innerEar} />
        {this.getInnerMost()}
      </Fragment>
    );
  };

  render = () => {
    return (
      <div className="right-panel">
        <InnerPageHeader
          title="[{PROPER}]"
          notes="[{PAGENOTES}]"
        />
        {this.getInnerPage()}
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_[{PROPER}] }) => ({
  sysConnected: reducer_Connection.isConnected,
  sysError: reducer_Connection.error,
  isLoading: reducer_[{PROPER}].isLoading,
  error: reducer_[{PROPER}].error,
  data: reducer_[{PROPER}].data
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_[{PROPER}]
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)([{PROPER}]Inner);
