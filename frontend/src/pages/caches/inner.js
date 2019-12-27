//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { dispatcher_Caches } from './dispatchers';
import { caches_local_menu } from '../../fake_data/summary-data';
import './caches.css';

import { InnerPageHeader, DetailTable, LocalMenu, Loading } from '../../components';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class CachesInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // EXISTING_CODE
      // EXISTING_CODE
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
      var query = 'modes=caches&types=' + value.replace('caches/', '');
      this.props.dispatcher_Caches(query);
    }
    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
    // EXISTING_CODE
    // EXISTING_CODE
    return <DetailTable css_pre="caches" data={this.props.data} innerEar={this.innerEar} />;
  };

  isReady = (props) => {
    return props.isLoading || (props.sysConnected && props.error) || (!props.sysConnected && props.sysError)
      ? false
      : true;
  };

  notReady = (props) => {
    if (props.isLoading) {
      return <Loading source="caches" message="Loading..." />;
    } else if (props.sysConnected && props.error) {
      return <Loading source="caches" status="error" message={props.error} />;
    } else if (!props.sysConnected && props.sysError) {
      return <Loading source="caches" status="error" message={props.sysError} />;
    }
    return <Fragment />;
  };

  getInnerPage = () => {
    if (!this.isReady(this.props)) return this.notReady(this.props);

    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <Fragment>
        <LocalMenu data={caches_local_menu} active={this.state.subpage} innerEar={this.innerEar} />
        {this.getInnerMost()}
      </Fragment>
    );
  };

  render = () => {
    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <div className="right-panel">
        <InnerPageHeader
          title="Caches"
          notes="TrueBlocks Caches greatly speed up access to the Ethereum data; however, they take up a lot of space on your 
            hard drive, so you have to keep any eye on them. Clean them out periodically so they don't get too big."
        />
        {this.getInnerPage()}
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_Caches }) => ({
  sysConnected: reducer_Connection.isConnected,
  sysError: reducer_Connection.error,
  isLoading: reducer_Caches.isLoading,
  error: reducer_Caches.error,
  data: reducer_Caches.data
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_Caches
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CachesInner);
