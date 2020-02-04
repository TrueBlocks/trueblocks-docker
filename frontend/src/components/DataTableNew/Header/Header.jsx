//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import HeaderCell from './HeaderCell';

//----------------------------------------------------------------------
function Header({ pKey, fields, ear }) {
  return (
    <thead>
      <tr>
        {fields.map((field, index) => {
          return <HeaderCell key={`${pKey}-c-${index}`} ear={ear} content={field} />;
        })}
      </tr>
    </thead>
  );
}

//----------------------------------------------------------------------
Header.propTypes = {
  fields: PropTypes.array.isRequired,
  ear: PropTypes.func
};

//----------------------------------------------------------------------
export default Header;
