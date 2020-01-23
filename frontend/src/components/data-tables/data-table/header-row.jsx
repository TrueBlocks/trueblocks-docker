/*-----------------------------------------------------------------------------*/
import React from 'react';
import PropTypes from 'prop-types';
import HeaderCell from './header-cell';
import * as utils from '../../../utils';
import './data-table.css';

//----------------------------------------------------------------------
export default class HeaderRow extends React.Component {
  render = () => {
    return (
      <div className={'data_table_header ' + utils.getBang(this.props.bang)}>
        {this.props.headers.map((field) => (
          <HeaderCell {...this.props} key={'h' + field} value={field} sort_str={field} />
        ))}
      </div>
    );
  };

  static propTypes = {
    headers: PropTypes.array
  };
}
