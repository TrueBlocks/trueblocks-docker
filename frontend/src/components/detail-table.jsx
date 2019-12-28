/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './detail-table.css';
const Utils = require('../utils');

//----------------------------------------------------------------------
export class DetailTable extends React.Component {
  getHeaders = () => {
    var fields = [];
    Object.keys(this.props.data[0]).map((key) => {
      fields.push(key);
      return true;
    });
    return fields;
  };

  componentDidMount() {}

  getContainer = () => {
    return (
      <Fragment>
        <h4>{this.props.title}</h4>
        <div className="detail_table">
          <DTHeader {...this.props} headers={this.getHeaders()} />
          {this.props.data.map((item, index) => {
            return (
              <div key={index + 'a0'} className={this.props.css_pre + '_detail_row'}>
                {Object.values(item).map((val, vid) => {
                  // console.log('x', typeof val, val);
                  return <DTCol key={index + '-' + vid} {...this.props} item={item} value={val} />;
                })}
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  };

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
class DTHeader extends React.Component {
  render = () => {
    return (
      <div className={this.props.css_pre + '_detail_header'}>
        {this.props.headers.map((field) => (
          <DTHeaderCol {...this.props} key={'h' + field} value={field} />
        ))}
      </div>
    );
  };

  static propTypes = {
    headers: PropTypes.array
  };
}

//----------------------------------------------------------------------
class DTHeaderCol extends React.Component {
  sortClicked = (el) => {
    this.props.innerEar('sort', this.props.value);
  };

  render = () => {
    return <div onClick={this.sortClicked}>{this.props.value}</div>;
  };

  static propTypes = {
    value: PropTypes.string
  };
}

//----------------------------------------------------------------------
class DTCol extends React.Component {
  expandClicked = () => {
    this.props.innerEar('expand', this.props.item);
  };

  render = () => {
    var cn = 'detail_table_item';
    if (Utils.isNumber(this.props.value)) cn = 'detail_table_item number';
    return (
      <div className={cn} onClick={this.expandClicked}>
        {Utils.isNumber(this.props.value) ? Utils.fmtInteger(this.props.value) : this.props.value}
      </div>
    );
  };

  static propTypes = {
    css_pre: PropTypes.string.isRequired,
    item: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array])
  };
}
