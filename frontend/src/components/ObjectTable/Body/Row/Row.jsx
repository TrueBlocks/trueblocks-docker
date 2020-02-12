//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
//import { EditableCell } from 'components';
import '../../ObjectTable.css';

//----------------------------------------------------------------------
function Row({ object, field, index, right }) {
  return (
    <div key={'a' + index} className={right ? 'ot_tr_right' : 'ot_tr'}>
      <Cell cn="ot_prompt" value={field.name + ':'} />
      <Cell
        cn={right ? 'ot_inner_right' : 'ot_inner'}
        type={field.type}
        value={object[field.name]}
        bold={field.bold}
        color={field.color}
      />
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
