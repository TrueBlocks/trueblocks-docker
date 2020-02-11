//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
//import { EditableCell } from 'components';
import '../../ObjectTable.css';

//----------------------------------------------------------------------
function Row({ object, field, index }) {
  return (
    <div key={'a' + index} className="ot_tr">
      <Cell cn="ot_prompt" value={field.name + ' (' + field.type + '):'} />
      <Cell cn="ot_inner" type={field.type} value={object[field.name]} />
    </div>
  );
}

//----------------------------------------------------------------------
Row.propTypes = {
  value: PropTypes.any.isRequired,
  cn: PropTypes.string.isRequired
};

//----------------------------------------------------------------------
export default Row;
