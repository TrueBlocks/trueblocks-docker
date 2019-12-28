//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Other } from './dispatchers';

import { InnerPageHeader, DetailTable, LocalMenu, isReady, NotReady } from '../../components';
import { other_local_menu } from '../../fake_data/summary-data';
import './other.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class OtherInner extends React.Component {
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
      //var query = 'modes=other&types=' + value.replace('other/', '');
      //this.props.dispatcher_Other(query);
    }
    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
    // EXISTING_CODE
    return (
      <Fragment>
        <ul>
          <li>Item 1 1</li>
          <li>Item 1 2</li>
          <li>Item 1 2</li>
          <li>Item 1 2</li>
        </ul>
      </Fragment>
    );
    // EXISTING_CODE
    // return <DetailTable css_pre="other" data={this.props.data} innerEar={this.innerEar} />;
  };

  getInnerPage = () => {
    if (!isReady(this.props, this.props)) return <NotReady {...this.props} />;

    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <Fragment>
        <LocalMenu data={other_local_menu} active={this.state.subpage} innerEar={this.innerEar} />
        {this.getInnerMost()}
      </Fragment>
    );
  };

  render = () => {
    return (
      <div className="right-panel">
        <InnerPageHeader
          title="Other"
          notes="The Other panel allows you to configure various other items related to TrueBlocks."
        />
        {this.getInnerPage()}
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_Other }) => ({
  sysConnected: reducer_Connection.isConnected,
  sysError: reducer_Connection.error,
  isLoading: reducer_Other.isLoading,
  error: reducer_Other.error,
  data: reducer_Other.data
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_Other
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherInner);
