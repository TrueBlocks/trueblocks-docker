/*-----------------------------------------------------------------------------*/
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';

//----------------------------------------------------------------------
function Scroll({ title, n_items, pages, cur_page, per_page, perPageChanged, pageChange }) {
  return (
    <div style={{ textAlign: 'right', paddingRight: '4px', paddingTop: '2px' }}>
      <form onSubmit={null}>
        {`${title} ${cur_page} of ${pages} `}
        <Icon bordered bg_color="white" onClick={() => pageChange('first')} icon="first_page" />{' '}
        <Icon bordered bg_color="white" onClick={() => pageChange('prev')} icon="chevron_left" />{' '}
        <Icon bordered bg_color="white" onClick={() => pageChange('next')} icon="chevron_right" />{' '}
        <Icon bordered bg_color="white" onClick={() => pageChange('last')} icon="last_page" />
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

Scroll.propTypes = {
  n_items: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  cur_page: PropTypes.number.isRequired,
  per_page: PropTypes.number.isRequired,
  perPageChanged: PropTypes.func.isRequired,
  pageChange: PropTypes.func.isRequired
};

export default Scroll;
