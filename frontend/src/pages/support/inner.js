//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Support } from './dispatchers';

import { BreadCrumb } from '../../components';
import { free_supportText } from './text/free_support';
import { per_incidentText } from './text/per_incident';
import { documentationText } from './text/documentation';
import { contact_usText } from './text/contact_us';
import { about_usText } from './text/about_us';
import * as su from './actions';
import './support.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class SupportInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_submenu: props.cur_submenu
    };
    // EXISTING_CODE
    // EXISTING_CODE
  }

  componentDidMount = () => {
    this.props.dispatcher_Support(this.state.cur_submenu.route + '?' + this.state.cur_submenu.query);
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerPage = () => {
    if (this.state.cur_submenu.subpage === 'dashboard') return <div>The dashboard for Support</div>;
    if (this.state.cur_submenu.query === su.FREE_SUPPORT) {
      return free_supportText();
    } else if (this.state.cur_submenu.query === su.PER_INCIDENT) {
      return per_incidentText();
    } else if (this.state.cur_submenu.query === su.DOCUMENTATION) {
      return documentationText();
    } else if (this.state.cur_submenu.query === su.CONTACT_US) {
      return contact_usText();
    } else if (this.state.cur_submenu.query === su.ABOUT_US) {
      return about_usText();
    }
    // EXISTING_CODE
    return <Fragment></Fragment>;
    // EXISTING_CODE
  };

  render = () => {
    return (
      <div className="inner-panel">
        <BreadCrumb page="Support" menu={this.state.cur_submenu} />
        {this.getInnerPage()}
        {JSON.stringify(this.state)}
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_SidePanels, reducer_Status, reducer_Support }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_SidePanels.isStatusExpanded ? reducer_Status.isConnected : true,
  sysError: reducer_SidePanels.isStatusExpanded ? reducer_Status.error : false,
  isLoading: reducer_Support.isLoading,
  error: reducer_Support.error,
  data: reducer_Support.data,
  meta: reducer_Support.meta
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_Support
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(SupportInner);
