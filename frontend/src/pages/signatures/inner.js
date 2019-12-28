//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Signatures } from './dispatchers';

import { InnerPageHeader, DetailTable, LocalMenu, isReady, NotReady } from '../../components';
import { signatures_local_menu } from '../../fake_data/summary-data';
import './signatures.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class SignaturesInner extends React.Component {
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
      //var query = 'modes=signatures&types=' + value.replace('signatures/', '');
      //this.props.dispatcher_Signatures(query);
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
        </ul>
      </Fragment>
    );
    // EXISTING_CODE
    // return <DetailTable css_pre="signatures" data={this.props.data} innerEar={this.innerEar} />;
  };

  getInnerPage = () => {
    if (!isReady(this.props, this.props)) return <NotReady {...this.props} />;

    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <Fragment>
        <LocalMenu data={signatures_local_menu} active={this.state.subpage} innerEar={this.innerEar} />
        {this.getInnerMost()}
      </Fragment>
    );
  };

  render = () => {
    return (
      <div className="right-panel">
        <InnerPageHeader
          title="Signatures"
          notes="TrueBlocks Signatures greatly speed up access to the Ethereum data; however, they take up a lot of space on your 
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
const mapStateToProps = ({ reducer_Connection, reducer_Signatures }) => ({
  sysConnected: reducer_Connection.isConnected,
  sysError: reducer_Connection.error,
  isLoading: reducer_Signatures.isLoading,
  error: reducer_Signatures.error,
  data: reducer_Signatures.data
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_Signatures
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignaturesInner);
