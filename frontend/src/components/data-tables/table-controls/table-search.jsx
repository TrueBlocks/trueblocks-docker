/*-----------------------------------------------------------------------------*/
import React from 'react';
import '../data-table/data-table.css';

//----------------------------------------------------------------------
function TableSearch({ size = '70', placeholder = 'Search...', style = { textAlign: 'left' } }) {
  return (
    <div style={style}>
      <form onSubmit={null}>
        <input size={size} placeholder={placeholder} ref={null}></input> <button>Filter</button>
      </form>
    </div>
  );
}

export default TableSearch;
