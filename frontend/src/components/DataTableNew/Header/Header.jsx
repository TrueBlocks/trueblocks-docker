//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import HeaderCell from './HeaderCell';

//---------------------------------------------------------------------
function Header({ parentKey, fields, ear }) {
  return (
    <thead>
      <tr>
        {fields.map((field, index) => {
          return <HeaderCell key={`${parentKey}-c-${index}`} ear={ear} content={field} />;
        })}
      </tr>
    </thead>
  );
}

//---------------------------------------------------------------------
Header.propTypes = {
  fields: PropTypes.array,
  ear: PropTypes.func
};

//---------------------------------------------------------------------
export default Header;
