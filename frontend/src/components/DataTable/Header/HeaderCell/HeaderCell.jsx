//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import { SortIcon } from '../../../Icon';
import '../../DataTable.css';

//----------------------------------------------------------------------
function HeaderCell({ field, sortedBy, sortDir, sortBy }) {
  return (
    <div className="dt_th" onClick={() => sortBy(field)}>
      <SortIcon field={field} sortedBy={sortedBy} sortDir={sortDir} color={'orange'} /> {field}
    </div>
  );
}

//----------------------------------------------------------------------
HeaderCell.propTypes = {
  field: PropTypes.string.isRequired,
  sortedBy: PropTypes.string.isRequired,
  sortDir: PropTypes.string.isRequired,
  sortBy: PropTypes.func.isRequired
};

//----------------------------------------------------------------------
export default HeaderCell;
