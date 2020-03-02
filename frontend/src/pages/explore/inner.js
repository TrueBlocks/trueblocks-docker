//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Explore } from './dispatchers';

import { BreadCrumb } from 'components';
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
    const links = this.props.meta.links;
    let loc = this.props.location.pathname;
    console.log('links: ', links);
    console.log('loc: ', loc);
    if (loc.includes('=latest&') && links.current === links.next) {
      console.log('here1-loc: ', loc);
      console.log('here2-cur: ', links.current);
      loc = loc.replace('=latest', '=' + links.current);
      console.log('here3-loc: ', loc);
    }
    let url;
    if (cmd === 'next') {
      url = loc.replace('=' + links.current + '&', '=' + links.next + '&');
      window.open(url, '_self');
    } else if (cmd === 'previous') {
      url = loc.replace('=' + links.current + '&', '=' + links.prev + '&');
      window.open(url, '_self');
    } else if (cmd === 'first') {
      url = loc.replace('=' + links.current + '&', '=0&');
      window.open(url, '_self');
    } else if (cmd === 'latest') {
      url = loc.replace('=' + links.current + '&', '=latest&');
      window.open(url, '_self');
    }
    console.log('cmd: ', cmd);
    console.log('url: ', url);
    // EXISTING_CODE
  };

  getInnerPage = () => {
    if (this.state.cur_submenu.subpage === 'dashboard') return <div>The dashboard for Explore</div>;
    if (isError(this.props)) return <NotReady {...this.props} />;
    else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
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
        {localStorage.getItem('debug') ? (
          <Debug state={this.state} fieldList={this.props.fieldList} meta={this.props.meta} />
        ) : (
          <Fragment></Fragment>
        )}
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ router, reducer_Panels, reducer_Status, reducer_Explore }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  location: router.location,
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
