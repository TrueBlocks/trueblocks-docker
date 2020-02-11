/*-----------------------------------------------------------------------------*/
import React from 'react';
import PropTypes from 'prop-types';
import Scroll from './Scroll';
import Search from './Search';
import './Controls.css';

//----------------------------------------------------------------------
function Controls(props) {
  return (
    <div className={'data_table_half_wide_row'}>
      <Search />
      <Scroll {...props}></Scroll>
    </div>
  );
}

Controls.propTypes = {
  n_items: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  cur_page: PropTypes.number.isRequired,
  per_page: (PropTypes.number || PropTypes.string).isRequired
};

export default Controls;
