/*-----------------------------------------------------------------------------*/
import React from 'react';
import PropTypes from 'prop-types';
import TableScroll from './table-scroll';
import TableSearch from './table-search';
import '../data-table/data-table.css';

//----------------------------------------------------------------------
function TableControls(props) {
  return (
    <div className={'data_table_half_wide_row ' + props.subpage}>
      <TableSearch />
      <TableScroll {...props}></TableScroll>
    </div>
  );
}

TableControls.propTypes = {
  n_items: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  cur_page: PropTypes.number.isRequired,
  per_page: (PropTypes.number || PropTypes.number).isRequired
};

export default TableControls;
