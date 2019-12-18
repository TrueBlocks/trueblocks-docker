//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_About } from './about-getdata';

import Loading from '../../components/loading';
import PageHeader from '../../components/page-header';
import { SummaryTable } from '../../components/summary-table';

import { summary_about_data } from '../../fake_data/summary-data';
// EXISTING_CODE
//exiting1
// EXISTING_CODE

//----------------------------------------------------------------------
class AboutInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      which: 'about'
      // EXISTING_CODE
      //exiting2
      // EXISTING_CODE
    };
    this.innerEar = this.innerEar.bind(this);
  }

  innerEar = (cmd, value) => {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');
    if (cmd === 'change_page') {
      if (value === '/') {
        window.open('/', '_self');
      } else {
        this.setState({
          which: value
          // EXISTING_CODE
          //exiting3
          // EXISTING_CODE
        });
      }
    }
    // EXISTING_CODE
    //existing4
    // EXISTING_CODE
  };

  getInner = () => {
    return (
      // EXISTING_CODE
      <Fragment>
        <h4>QuickBlocks</h4>
        <div>
          The fastest, fully-decentralized way to access data from any Ethereum address or smart contract. Providing
          open source software libraries and tools for developers and accounting / auditing / monitoring solutions for
          the rest of us.
        </div>
        <h4>Design Philosophy</h4>
        <div>
          Local-first, 100% decentralized access to full detail Ethereum activity per account on consumer-grade
          hardware.
        </div>
        <h4>Team</h4>
        <div>Thomas Rush, Ed Mazurek, Joe G., Todd</div>
      </Fragment>
      // EXISTING_CODE
    );
  };

  getContainer = () => {
    let container;
    if (this.props.error) {
      container = <Loading status="error" message={this.props.error} />;
    } else if (this.props.isConnected) {
      container = (
        <div className="inner-panel">
          <SummaryTable data={summary_about_data} active={this.state.which} no_labels innerEar={this.innerEar} />
          <h4>{this.state.which}</h4>
          {this.getInner()}
        </div>
      );
    } else {
      container = <Loading status="initializing" message="Initializing..." />;
    }
    return container;
  };

  render = () => {
    return (
      <div className="right-panel">
        <div>
          <PageHeader
            title="About"
            notes="Learn about the TrubBlocks project, our organization, our philosopy 
            towards decentralization, and our team."
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
const mapStateToProps = ({ reducer_Connection, reducer_About }) => ({
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_About
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutInner);
