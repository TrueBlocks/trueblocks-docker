/*-----------------------------------------------------------------------------*/
import React from 'react';
import '../DataTable/DataTable.css';

//----------------------------------------------------------------------
export function DataTableSearch({ size = '70', placeholder = 'Search...', style = { textAlign: 'left' } }) {
  return (
    <div style={style}>
      <form onSubmit={null}>
        <input size={size} placeholder={placeholder} ref={null}></input> <button>Filter</button>
      </form>
    </div>
  );
}
