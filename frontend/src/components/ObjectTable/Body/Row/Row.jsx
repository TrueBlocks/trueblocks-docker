//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
//import { EditableCell } from 'components';
import '../../ObjectTable.css';

//----------------------------------------------------------------------
function Row({ pKey, object, field, index, right }) {
  return (
    <div key={pKey + index} className={right ? 'ot_tr_right' : 'ot_tr'}>
      <Cell cn="ot_prompt" type={'string'} value={field.name + ':'} />
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
  object: PropTypes.any.isRequired,
  field: PropTypes.any.isRequired
};

//----------------------------------------------------------------------
export default Row;
