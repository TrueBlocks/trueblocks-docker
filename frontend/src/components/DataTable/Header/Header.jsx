//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import HeaderCell from './HeaderCell';
import { getBang } from 'utils';
import '../DataTable.css';

/**
 * The header row of the DataTable component
 * @name DataTable::Header
 * @param {string} pKey - the key of the parent component (used to build this component's key)
 * @param {array} theFields - JSON array matching rows describing types of columns in rows
 * @param {array} displayMap - Map describing which fields to display and alternative name for fields
 * @param {array} sortCtx - context for the current sorting context of the DataTable
 */
function Header({ pKey, theFields, displayMap, sortCtx }) {
  return (
    <div className={'dt_thead ' + getBang(displayMap.size + 1)}>
      {theFields.map((field, index) => {
        const dispField = displayMap.get(field.name);
        return (
          <HeaderCell
            key={`${pKey}-c-${index}`}
            showing={dispField && dispField.showing}
            sortCtx={sortCtx}
            sortField={field.name}
            content={dispField ? (dispField.name !== undefined ? dispField.name : field.name) : field.name}
          />
        );
      })}
      <HeaderCell key={`${pKey}-c-10000`} showing={true} sortCtx={sortCtx} content={' '} />
    </div>
  );
}

//----------------------------------------------------------------------
Header.propTypes = {
  theFields: PropTypes.array.isRequired,
  sortCtx: PropTypes.object.isRequired,
  ear: PropTypes.func
};

//----------------------------------------------------------------------
export default Header;
