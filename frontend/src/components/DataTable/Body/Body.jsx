//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import { getKeys, getBang } from 'utils';

/**
 * A table to display row major data
 * @param {array} theData - an JSON array of rows of data
 * @param {array} theFields - JSON array matching rows describing types of columns in rows
 * @param {array} displayMap - Map describing which fields to display and alternative name for fields
 * @param {object} controls - Controls (next, prev, search, etc.) for the table
 * @param {func} tableEar - listener to bubble up events to the table, passed on as bodyEar
 */
function Body({ theData, theFields, displayMap, controls, icons, del_icons, tableEar }) {
  const classNames = ['dt_tr', getBang(displayMap.size + 1)].join(' ');
  const start = (controls.cur_page - 1) * controls.per_page;
  return (
    <Fragment>
      {theData.map((row, index) => {
        if (index >= start && index < start + controls.per_page)
          return (
            <Row
              {...getKeys('r' + index)}
              displayMap={displayMap}
              theFields={theFields}
              row={row}
              cn={classNames}
              bodyEar={tableEar}
              icon_list={row['deleted'] ? del_icons : icons}
            />
          );
        else return false;
      })}
    </Fragment>
  );
}

//----------------------------------------------------------------------
Body.propTypes = {
  theData: PropTypes.array.isRequired,
  theFields: PropTypes.array.isRequired,
  controls: PropTypes.object.isRequired,
  tableEar: PropTypes.func.isRequired
};

//----------------------------------------------------------------------
export default Body;
