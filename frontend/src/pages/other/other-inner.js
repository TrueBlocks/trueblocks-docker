//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Other } from './other-getdata';

import Loading from '../../components/loading';
import PageHeader from '../../components/page-header';
import { LocalMenu } from '../../components/local-menu';
import './other.css';

// EXISTING_CODE
import { summary_other_data } from '../../fake_data/summary-data';
// EXISTING_CODE

//----------------------------------------------------------------------
class OtherInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // EXISTING_CODE
      // EXISTING_CODE
      subpage: 'other/generated'
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  // EXISTING_CODE

  innerEar = (cmd, value) => {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');

    // EXISTING_CODE
    // EXISTING_CODE

    if (cmd === 'change_subpage') {
      this.setState({
        // EXISTING_CODE
        // EXISTING_CODE
        subpage: value
      });
    } else if (cmd === 'goto_page') {
      window.open('/' + value.replace('/', '?sub='), '_self');
    }
    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInner = () => {
    return (
      // EXISTING_CODE
      <Fragment>
        <ul>
          <li>Item 1 1</li>
          <li>Item 1 2</li>
          <li>Item 1 2</li>
          <li>Item 1 2</li>
        </ul>
      </Fragment>
      // EXISTING_CODE
    );
  };

  getContainer = () => {
    var isConnected = this.props.isConnected;
    // EXISTING_CODE
    // EXISTING_CODE
    let container;
    if (this.props.error) {
      container = <Loading status="error" message={this.props.error} />;
    } else if (isConnected) {
      container = (
        <div className="inner-panel">
          <LocalMenu data={summary_other_data} active={this.state.subpage} innerEar={this.innerEar} />
          {this.getInner()}
        </div>
      );
    } else {
      container = <Loading status="initializing" message="Loading..." />;
    }
    return container;
  };

  render = () => {
    return (
      <div className="right-panel">
        <div>
          <PageHeader
            title="Other"
            notes="The Other panel allows you to configure various other items related to TrueBlocks."
          />
          {this.getContainer()}
        </div>
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_Other }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_Other
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherInner);
