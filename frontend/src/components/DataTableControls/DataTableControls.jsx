/*-----------------------------------------------------------------------------*/
import React from 'react';
import PropTypes from 'prop-types';
import { DataTableScroll } from './DataTableScroll';
import { DataTableSearch } from './DataTableSearch';
import '../DataTable/DataTable.css';

//----------------------------------------------------------------------
export function DataTableControls(props) {
  return (
    <div className={'data_table_half_wide_row ' + props.subpage}>
      <DataTableSearch />
      <DataTableScroll {...props}></DataTableScroll>
    </div>
  );
}

DataTableControls.propTypes = {
  n_items: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  cur_page: PropTypes.number.isRequired,
  per_page: (PropTypes.number || PropTypes.number).isRequired
};
