/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../Icon';
import './DataTable.css';

//----------------------------------------------------------------------
export default class HeaderCell extends React.Component {
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
        {this.props.value.replace('is_', '').replace('_', ' ')} {this.getSortIcon()}
      </div>
    );
  };

  static propTypes = {
    value: PropTypes.string,
    sort_str: PropTypes.string
  };
}
