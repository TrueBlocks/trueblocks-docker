//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Controls from '../Controls';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import { getKeys, sortArray } from 'utils';
import './DataTable.css';

/**
 * A table to display row major data
 * @param {array} theData - array containing the rows of data
 * @param {array} theFields - array matching `theData` describing each column in the rows
 * @param {array} displayMap - a map describing what to display in what order with optional alternative name for fields
 * @param {array} headerIcons - list of icons for the header's icon tray
 * @param {array} icons - list of icons for the rows' icon tray
 * @param {func} tableEar - listener for all bubbled up events on the table
 */
//----------------------------------------------------------------------
class DataTable extends React.Component {
  constructor(props) {
    super(props);

    var n_items = props.theData ? props.theData.length : 1;
    var per_page = localStorage.getItem('per_page') || 25;
    var pages = Math.floor((n_items - 1) / per_page) + 1;
    this.state = {
      sortCtx: {
        sortedBy: localStorage.getItem('dt_sortedby'),
        sortDir: localStorage.getItem('dt_sortdir') || true,
        sortBy: this.sortBy
      },
      n_items: n_items,
      cur_page: 1,
      pages: pages,
      per_page: per_page,
      theData: props.theData
    };
  }

  sortBy = (cmd, field, dir) => {
    //field = field.toLowerCase();
    console.log('cmd: ', cmd, 'field: ', field, 'predir: ', dir);
    // If it's the same field, switch direction, otherwise sort ascending
    var sortDir = this.state.sortCtx.sortedBy === field ? !this.state.sortCtx.sortDir : true;
    console.log('sortDir: ', sortDir);
    localStorage.setItem('dt_sortedby', field);
    localStorage.setItem('dt_sortdir', sortDir);
    console.log('rows-before', this.state.theData[0]);
    this.setState({
      ...this.state,
      sortCtx: {
        sortedBy: field,
        sortDir: sortDir,
        sortBy: this.sortBy
      },
      theData: sortArray(this.state.theData, field, sortDir),
      cur_page: 1
    });
    console.log('rows-after', this.state.theData[0]);
    return;
  };

  componentWillMount() {
    this.sortBy('sort', this.state.sortCtx.sortedBy, this.state.sortCtx.sortDir);
  }

  perPageChanged = (event) => {
    var per_page = event.target.value;
    var n_items = this.state.n_items;
    var pages = Math.floor((n_items - 1) / per_page) + 1;
    var cur_page = Math.min(pages, this.state.cur_page);
    console.log(per_page, n_items, pages, cur_page);
    this.setState({
      ...this.state,
      pages: pages,
      cur_page: cur_page,
      per_page: per_page
    });
  };

  pageChange = (dir) => {
    let new_page = this.state.cur_page;
    if (dir === 'first') new_page = 0;
    else if (dir === 'last') new_page = this.state.pages;
    else if (dir === 'next') new_page = this.state.cur_page + 1;
    else if (dir === 'prev') new_page = this.state.cur_page - 1;
    this.setState({
      ...this.state,
      cur_page: new_page < 1 ? 1 : new_page > this.state.pages ? this.state.pages : new_page
    });
  };

  render = () => {
    if (!this.props.theFields || this.props.theFields.length === 0) {
      return <div>No fields were supplied, can't draw anything.</div>;
    }
    const showControls = true;
    const { tableEar, theData } = this.props;
    const icons = [
      { action: 'launch' },
      { action: 'refresh' },
      { action: 'explore', icon: 'list_alt' },
      { action: 'delete', icon: 'delete_outline' },
      { action: 'add', icon: 'add' }
    ];
    const del_icons = [
      { action: 'launch', disabled: true },
      { action: 'refresh', disabled: true },
      { action: 'remove', icon: 'delete_forever' },
      { action: 'undo' }
    ];
    return (
      <Fragment>
        {showControls ? (
          <Controls
            title="page"
            n_items={theData ? theData.length : 0}
            pages={this.state.pages}
            cur_page={this.state.cur_page}
            per_page={this.state.per_page}
            perPageChanged={this.perPageChanged}
            pageChange={this.pageChange}
          />
        ) : (
          <Fragment></Fragment>
        )}
        <div className={'data_table'}>
          <Header
            {...getKeys('dth')}
            displayMap={this.props.displayMap}
            theFields={this.props.theFields}
            sortCtx={this.state.sortCtx}
            headerEar={tableEar}
          />
          <Body
            theData={theData}
            displayMap={this.props.displayMap}
            theFields={this.props.theFields}
            controls={{ cur_page: this.state.cur_page, per_page: this.state.per_page }}
            sortBy={this.sortBy}
            bodyEar={tableEar}
            icons={icons}
            del_icons={del_icons}
          />
        </div>
        <Footer
          {...getKeys('dth')}
          theData={theData}
          displayMap={this.props.displayMap}
          theFields={this.props.theFields}
          sortCtx={this.state.sortCtx}
          headerEar={tableEar}
        />
      </Fragment>
    );
  };
}

//----------------------------------------------------------------------
DataTable.propTypes = {
  // title: PropTypes.string.isRequired,
  // explainer: PropTypes.string.isRequired,
  theFields: PropTypes.array.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableEar: PropTypes.func.isRequired
};

//----------------------------------------------------------------------
const mapStateToProps = ({ router }, ownProps) => ({
  location: router.location,
  mainMenu: ownProps.mainMenu
});

//----------------------------------------------------------------------
export const ConnectedDataTable = connect(mapStateToProps)(DataTable);
