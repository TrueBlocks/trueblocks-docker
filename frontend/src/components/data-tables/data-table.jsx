/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../icon';
import * as utils from '../../utils';
import './data-table.css';

//----------------------------------------------------------------------
export class DataTable extends React.Component {
  constructor(props) {
    super(props);
    var fields = [];
    Object.keys(this.props.data[0]).map((key) => {
      fields.push(key);
      return true;
    });

    var per_page = localStorage.getItem('per_page') || 25;
    this.state = {
      sortedBy: localStorage.getItem('dt_sortedby') || fields[0],
      sortDir: localStorage.getItem('dt_sortdir') || true,
      per_page: per_page,
      cur_page: 1,
      pages: Math.floor(((props.data ? props.data.length : 0) - 1) / per_page) + 1,
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
      data: this.sortData(this.props.data, field, sortDir)
    });
    return;
  };

  componentWillMount() {
    this.sortBy(this.state.sortedBy, this.state.sortDir);
  }

  getContainer = () => {
    var str =
      !this.props.fields ||
      JSON.stringify(
        this.props.fields.map((item) => {
          return item.name;
        })
      );
    return (
      <Fragment>
        <h4>{'Table title: ' + str}</h4>
        <DataTableControls
          {...this.props}
          pages={this.state.pages}
          cur_page={this.state.cur_page}
          per_page={this.state.per_page}
        />
        <div className={'data_table ' + this.props.subpage}>
          <DataTableHeaderRow
            {...this.props}
            headers={this.state.fieldList}
            sortBy={this.sortBy}
            sortedBy={this.state.sortedBy}
            sortDir={this.state.sortDir}
            bang={this.state.fieldList.length}
          />
          {this.props.data.map((item, index) => {
            return (
              <Fragment>
                <div key={index + 'a0'} className={'data_table_row ' + getBang(this.state.fieldList.length)}>
                  {Object.values(item).map((val, vid) => {
                    return <DataTableItem key={index + '-' + vid} {...this.props} item={item} value={val} />;
                  })}
                </div>
              </Fragment>
            );
          })}
        </div>
      </Fragment>
    );
  };

  // <div key={index + 'b0'} className={'data_table_wide_row ' + getBang(this.state.fieldList.length)}>
  //   <Fragment>{'x'}</Fragment>
  // </div>

  render = () => {
    return this.getContainer();
  };

  static propTypes = {
    // title: PropTypes.string.isRequired,
    // explainer: PropTypes.string.isRequired,
    subpage: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
  };
}

function getBang(num) {
  var bangs = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
  if (num > 11) num = 11;
  return bangs[num] + '_bang';
}

//----------------------------------------------------------------------
class DataTableHeaderRow extends React.Component {
  render = () => {
    return (
      <div className={'data_table_header ' + getBang(this.props.bang)}>
        {this.props.headers.map((field) => (
          <DataTableHeaderItem {...this.props} key={'h' + field} value={field} sort_str={field} />
        ))}
      </div>
    );
  };

  static propTypes = {
    headers: PropTypes.array
  };
}

//----------------------------------------------------------------------
class DataTableHeaderItem extends React.Component {
  sortClicked = (el) => {
    this.props.sortBy(this.props.sort_str);
  };

  getSortIcon = (field) => {
    return this.props.sort_str === this.props.sortedBy ? (
      this.props.sortDir ? (
        <Icon midsize icon="arrow_drop_down" color="orange" title="ascending" />
      ) : (
        <Icon midsize icon="arrow_drop_up" color="orange" title="descending" />
      )
    ) : (
      <Icon midsize invisible />
    );
  };

  render = () => {
    if (!this.props.value || this.props.value === '') return <Fragment></Fragment>;
    return (
      <div className="data_table_header-item" onClick={this.sortClicked}>
        {this.props.value.replace('_', ' ')} {this.getSortIcon()}
      </div>
    );
  };

  static propTypes = {
    value: PropTypes.string,
    sort_str: PropTypes.string
  };
}

//----------------------------------------------------------------------
class DataTableItem extends React.Component {
  expandClicked = () => {
    this.props.innerEar('expand', this.props.item);
  };

  render = () => {
    var cn = 'data_table_table_item';
    var isNum = !utils.isHex(this.props.value) && utils.isNumber(this.props.value);
    if (isNum) cn = 'data_table_table_item number';
    var val = this.props.value;
    if (typeof this.props.value === 'object') {
      val = JSON.stringify(this.props.value);
    }

    return (
      <div className={cn} onClick={this.expandClicked}>
        {isNum ? utils.fmtInteger(val) : val}
      </div>
    );
  };

  static propTypes = {
    subpage: PropTypes.string.isRequired,
    item: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array])
  };
}

//----------------------------------------------------------------------
class DataTableControls extends React.Component {
  render = () => {
    return (
      <Fragment>
        <div className={'data_table_half_wide_row thing ' + this.props.subpage}>
          <DataTableControlsSearch {...this.props}></DataTableControlsSearch>
          <DataTableControlsScroll {...this.props}></DataTableControlsScroll>
        </div>
      </Fragment>
    );
  };

  static propTypes = {
    pages: PropTypes.number.isRequired,
    cur_page: PropTypes.number.isRequired,
    per_page: PropTypes.number.isRequired
  };
}

//----------------------------------------------------------------------
class DataTableControlsSearch extends React.Component {
  render = () => {
    return (
      <Fragment>
        <div className="half_wide_left">
          <form onSubmit={null}>
            <input size="80" className="thing" placeholder="Search..." ref={null}></input>{' '}
            <button className="thing">Filter</button>
          </form>
        </div>
      </Fragment>
    );
  };
}

//----------------------------------------------------------------------
class DataTableControlsScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: props.per_page
    };
  }

  onSelectChange = (event) => {
    this.setState({ perPage: event.target.value });
  };

  render = () => {
    if (this.props.pages < 2) {
      return <Fragment></Fragment>;
    }
    return (
      <Fragment>
        <div className="half_wide_right">
          <form onSubmit={null}>
            page {this.props.cur_page} of {this.props.pages} <Icon bordered icon="first_page" />{' '}
            <Icon bordered icon="chevron_left" /> <Icon bordered icon="chevron_right" />{' '}
            <Icon bordered icon="last_page" /> showing{' '}
            <select className="thing" name="what" value={this.state.perPage} onChange={this.onSelectChange}>
              <option key="10">10</option>
              <option key="25">25</option>
              <option key="100">100</option>
            </select>{' '}
            of {this.props.data ? this.props.data.length : 0}
          </form>
        </div>
      </Fragment>
    );
  };
}
