//----------------------------------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Explore } from './dispatchers';

import { BreadCrumb } from 'components';
import { Icon } from 'components';
import { Debug } from 'components';
import { isReady } from 'components';
import { ObjectTable } from 'components';
import { isError, NotReady, isEmpty, EmptyQuery } from 'components';
import './explore.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class ExploreInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_submenu: props.cur_submenu
    };
    this.tableEar = this.tableEar.bind(this);
    // EXISTING_CODE
    // EXISTING_CODE
  }

  componentDidMount = () => {
    this.props.dispatcher_Explore(this.state.cur_submenu.route + '?' + this.state.cur_submenu.query);
  };

  // EXISTING_CODE
  // EXISTING_CODE

  tableEar = (cmd, arg) => {
    // EXISTING_CODE
    const link = this.props.meta.links;
    const loc = this.props.location.pathname;
    if (cmd === 'next') {
      window.open(loc.replace(link.current, link.next), '_self');
    } else if (cmd === 'previous') {
      window.open(loc.replace(link.current, link.prev), '_self');
    } else if (cmd === 'first') {
      window.open(loc.replace(link.current, 'occurrence=0'), '_self');
    } else if (cmd === 'latest') {
      window.open(loc.replace(link.current, 'occurrence=latest'), '_self');
    }
    // EXISTING_CODE
  };

  getInnerPage = () => {
    if (this.state.cur_submenu.subpage === 'dashboard') return <div>The dashboard for Explore</div>;
    if (isError(this.props)) return <NotReady {...this.props} />;
    //else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    const object = this.props.data[0].result ? this.props.data[0].result : this.props.data[0];
    // EXISTING_CODE
    return (
      <ObjectTable
        title={'Explore: ' + this.state.cur_submenu}
        theFields={this.props.fieldList}
        object={object}
        tableEar={this.tableEar}
        showNav={true}
      />
    );
  };

  render = () => {
    return (
      <div className="inner-panel">
        <BreadCrumb page="Explore" menu={this.state.cur_submenu} />
        {this.getInnerPage()}
        <Debug state={this.state} fieldList={this.props.fieldList} meta={this.props.meta} />
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ router, reducer_Panels, reducer_Status, reducer_Explore }) => ({
  // EXISTING_CODE
  location: router.location,
  // EXISTING_CODE
  sysConnected: reducer_Panels.isStatusExpanded ? reducer_Status.isConnected : true,
  sysError: reducer_Panels.isStatusExpanded ? reducer_Status.error : false,
  isLoading: reducer_Explore.isLoading,
  error: reducer_Explore.error,
  fieldList: reducer_Explore.fieldList,
  data: reducer_Explore.data,
  meta: reducer_Explore.meta
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_Explore
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(ExploreInner);
