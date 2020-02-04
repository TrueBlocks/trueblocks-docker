//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { DataTableControls } from '../DataTableControls';
import Header from './Header';
import Body from './Body';

import * as Utils from '../../utils';
import './DataTable.css';

//----------------------------------------------------------------------
class DataTable extends React.Component {
  constructor(props) {
    super(props);
    var fields = [];
    Object.keys(this.props.rows[0]).map((key) => {
      fields.push(key);
      return true;
    });

    var n_items = props.rows ? props.rows.length : 1;
    var per_page = localStorage.getItem('per_page') || 25;
    var pages = Math.floor((n_items - 1) / per_page) + 1;
    this.state = {
      sortedBy: localStorage.getItem('dt_sortedby') || fields[0],
      sortDir: localStorage.getItem('dt_sortdir') || true,
      n_items: n_items,
      cur_page: 1,
      pages: pages,
      per_page: per_page,
      fieldList: fields
    };
  }

  sortData(data, field, asc) {
    data.sort(function(a, b) {
      if (asc) {
        return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
      } else {
        return b[field] > a[field] ? 1 : b[field] < a[field] ? -1 : 0;
      }
    });
    return data;
  }

  sortBy = (field, dir) => {
    var sortDir = this.state.sortedBy === field ? !this.state.sortDir : dir ? dir : true;
    localStorage.setItem('dt_sortedby', field);
    localStorage.setItem('dt_sortdir', sortDir);
    this.setState({
      ...this.state,
      sortedBy: field,
      sortDir: sortDir,
      rows: this.sortData(this.props.rows, field, sortDir)
    });
    return;
  };

  componentWillMount() {
    this.sortBy(this.state.sortedBy, this.state.sortDir);
  }

  perPageChanged = (event) => {
    var per_page = event.target.value;
    var n_items = this.state.n_items;
    var pages = Math.floor((n_items - 1) / per_page) + 1;
    var cur_page = Math.min(pages, this.state.cur_page);
    console.log(per_page, n_items, pages, cur_page);
    this.setState({
      pages: pages,
      cur_page: cur_page,
      per_page: per_page
    });
  };

  render = () => {
    const showControls = true;
    const { rows } = this.props;
    return (
      <Fragment>
        <div>new table</div>
        {showControls ? (
          <DataTableControls
            n_items={this.props.data ? this.props.data.length : 0}
            pages={this.state.pages}
            cur_page={this.state.cur_page}
            per_page={this.state.per_page}
            perPageChanged={this.perPageChanged}
          />
        ) : (
          <Fragment></Fragment>
        )}
        <div className={'data_table'}>
          <Header
            {...Utils.getKeys('dth')}
            {...this.props}
            fields={this.state.fieldList}
            sortBy={this.sortBy}
            sortedBy={this.state.sortedBy}
            sortDir={this.state.sortDir}
            bang={this.state.fieldList.length}
          />
          <Body rows={rows} fields={this.state.fieldList} />
        </div>
      </Fragment>
    );
  };
}

//----------------------------------------------------------------------
DataTable.propTypes = {
  // title: PropTypes.string.isRequired,
  // explainer: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

//----------------------------------------------------------------------
const mapStateToProps = ({ router }, ownProps) => ({
  location: router.location,
  mainMenu: ownProps.mainMenu
});

//----------------------------------------------------------------------
export const ConnectedDataTable = connect(mapStateToProps)(DataTable);
