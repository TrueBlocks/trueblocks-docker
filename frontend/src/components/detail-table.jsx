/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon } from './icon';
import './detail-table.css';
const Utils = require('../utils');

//----------------------------------------------------------------------
export class DataTable extends React.Component {
  constructor(props) {
    super(props);
    var fields = [];
    Object.keys(this.props.data[0]).map((key) => {
      fields.push(key);
      return true;
    });
    this.state = {
      sortedBy: fields[0],
      sortDir: true,
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

  sortBy = (field) => {
    var sortDir = this.state.sortedBy === field ? !this.state.sortDir : true;
    this.setState({
      ...this.state,
      sortedBy: field,
      sortDir: sortDir,
      data: this.sortData(this.props.data, field, sortDir)
    });
    return;
  };

  componentDidMount() {
    this.sortData(this.props.data, this.state.sortedBy, this.state.sortDir);
  }

  getContainer = () => {
    return (
      <Fragment>
        <h4>{this.props.title}</h4>
        <div className="detail_table">
          <DataTableHeaderRow
            {...this.props}
            headers={this.state.fieldList}
            sortBy={this.sortBy}
            sortedBy={this.state.sortedBy}
            sortDir={this.state.sortDir}
          />
          {this.props.data.map((item, index) => {
            return (
              <Fragment>
                <div key={index + 'a0'} className={'detail_row ' + this.props.css_pre}>
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
  // <div key={index + 'b0'} className={'detail_wide_row ' + this.props.css_pre}>
  //   <Fragment>Expanded</Fragment>;
  // </div>

  render = () => {
    return this.getContainer();
  };

  static propTypes = {
    title: PropTypes.string,
    css_pre: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
  };
}

//----------------------------------------------------------------------
class DataTableHeaderRow extends React.Component {
  render = () => {
    return (
      <div className={'detail_header ' + this.props.css_pre}>
        {this.props.headers.map((field) => (
          <DataTableHeaderItem {...this.props} key={'h' + field} value={field} />
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
    this.props.sortBy(this.props.value);
  };

  getSortIcon = (field) => {
    if (this.props.value === this.props.sortedBy) {
      if (this.props.sortDir)
        return <Icon midsize icon="arrow_drop_down" color="orange" title="ascending" onClick={null} />;
      return <Icon midsize icon="arrow_drop_up" color="orange" title="descending" onClick={null} />;
    }
    return <Icon midsize invisible onClick={null} />;
  };

  render = () => {
    return (
      <div className="detail_header_item" onClick={this.sortClicked}>
        {this.props.value} {this.getSortIcon()}
      </div>
    );
  };

  static propTypes = {
    value: PropTypes.string
  };
}

//----------------------------------------------------------------------
class DataTableItem extends React.Component {
  expandClicked = () => {
    this.props.innerEar('expand', this.props.item);
  };

  render = () => {
    var cn = 'detail_table_item';
    var isNum = !Utils.isAddress(this.props.value) && Utils.isNumber(this.props.value);
    if (isNum) cn = 'detail_table_item number';
    var val = this.props.value;
    if (typeof this.props.value === 'object') {
      val = JSON.stringify(this.props.value);
    }

    return (
      <div className={cn} onClick={this.expandClicked}>
        {isNum ? Utils.fmtInteger(val) : val}
      </div>
    );
  };

  static propTypes = {
    css_pre: PropTypes.string.isRequired,
    item: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array])
  };
}
