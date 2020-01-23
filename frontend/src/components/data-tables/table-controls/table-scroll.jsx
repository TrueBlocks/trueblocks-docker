/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import { Icon } from '../../icon';
import '../data-table/data-table.css';

//----------------------------------------------------------------------
function TableScroll({ n_items, pages, cur_page, per_page, perPageChanged }) {
  return (
    <div style={{ textAlign: 'right' }}>
      <form onSubmit={null}>
        {`page ${cur_page} of ${pages} `}
        <Icon bordered icon="first_page" /> <Icon bordered icon="chevron_left" /> <Icon bordered icon="chevron_right" />{' '}
        <Icon bordered icon="last_page" />
        {` showing `}
        <select name="per_page" value={per_page} onChange={perPageChanged}>
          <option key="10">10</option>
          <option key="25">25</option>
          <option key="100">100</option>
        </select>
        {` of ${n_items}`}
      </form>
    </div>
  );
}

export default TableScroll;
