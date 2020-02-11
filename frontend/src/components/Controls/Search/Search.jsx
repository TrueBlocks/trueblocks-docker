/*-----------------------------------------------------------------------------*/
import React from 'react';

//----------------------------------------------------------------------
function Search({
  size = '70',
  placeholder = 'Search...',
  style = { border: '0 !important', textAlign: 'left', paddingLeft: '1px' }
}) {
  return (
    <div style={style}>
      <form onSubmit={null}>
        <input style={{ backgroundColor: 'lightyellow' }} size={size} placeholder={placeholder} ref={null}></input>
        <button>Filter</button>
      </form>
    </div>
  );
}

export default Search;
