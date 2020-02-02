/*-----------------------------------------------------------------------------*/
import React from 'react';
import PropTypes from 'prop-types';
import HeaderCell from './HeaderCell';
import * as utils from '../../utils';
import './DataTable.css';

//----------------------------------------------------------------------
export default class HeaderRow extends React.Component {
  render = () => {
    return (
      <div className={'data_table_header ' + utils.getBang(this.props.bang)}>
        {this.props.fields.map((field) => (
          <HeaderCell {...this.props} key={'h' + field} value={field} sort_str={field} />
        ))}
      </div>
    );
  };

  static propTypes = {
    fields: PropTypes.array
  };
}
