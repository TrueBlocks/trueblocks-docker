/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import Row from './Row';

import '../DataTable.css';
import * as Utils from '../../../utils';

//----------------------------------------------------------------------
function Body({ rows, fields }) {
  const classNames = ['dt_tr', Utils.getBang(fields.length)].join(' ');
  return (
    <Fragment>
      {rows.map((item, index) => {
        return <Row {...Utils.getKeys('r' + index)} cn={classNames} item={item} row={item} />;
      })}
    </Fragment>
  );
}

export default Body;
