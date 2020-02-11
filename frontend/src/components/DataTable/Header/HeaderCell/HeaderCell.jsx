//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { SortIcon } from 'components/Icon/Icon';
import '../../DataTable.css';

//----------------------------------------------------------------------
function HeaderCell({ content, sortCtx, sortField, showing }) {
  if (!showing) return <Fragment></Fragment>;
  return (
    <div className="dt_th" onClick={() => sortCtx.sortBy('sort', sortField, sortCtx.sortDir)}>
      <SortIcon field={sortField} sortCtx={sortCtx} color={'orange'} /> {content}
    </div>
  );
}

//----------------------------------------------------------------------
HeaderCell.propTypes = {
  content: PropTypes.string.isRequired,
  sortCtx: PropTypes.object.isRequired
};

//----------------------------------------------------------------------
export default HeaderCell;
