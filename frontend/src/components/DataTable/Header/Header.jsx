//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import HeaderCell from './HeaderCell';
import * as utils from '../../../utils';
import '../DataTable.css';

//----------------------------------------------------------------------
function Header({ pKey, fields, sortedBy, sortDir, sortBy, bang }) {
  return (
    <div className={'dt_thead ' + utils.getBang(bang)}>
      {fields.map((field) => (
        <HeaderCell
          key={pKey + '-' + field}
          field={field.replace('is_', '').replace('_', ' ')}
          sortedBy={sortedBy}
          sortDir={sortDir}
          sortBy={sortBy}
        />
      ))}
    </div>
  );
}

//----------------------------------------------------------------------
Header.propTypes = {
  fields: PropTypes.array.isRequired,
  sortedBy: PropTypes.string.isRequired,
  sortDir: PropTypes.string.isRequired,
  sortBy: PropTypes.func.isRequired,
  bang: PropTypes.number.isRequired
};

//----------------------------------------------------------------------
export default Header;
