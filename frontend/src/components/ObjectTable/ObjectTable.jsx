//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Body from './Body';
import './ObjectTable.css';

//----------------------------------------------------------------------
function ObjectTable({ object, theFields, title, tableEar, showNav, options = defaultOpts }) {
  return (
    <div className={'object_table'} style={{ width: options.width, margin: options.margin, padding: options.padding }}>
      {options.header ? (
        <Header title={title} showNav={showNav} headerEar={tableEar} />
      ) : (
          <div>
          </div>
        )}
      <Body theFields={theFields} object={object} side={options.sider} right={options.rightAlign} bodyEar={tableEar} />
    </div>
  );
}

//----------------------------------------------------------------------
ObjectTable.propTypes = {
  object: PropTypes.PropTypes.object.isRequired,
  theFields: PropTypes.PropTypes.array.isRequired
};

//----------------------------------------------------------------------
export const defaultOpts = { margin: '0%', width: '75%', padding: '0', header: true, sider: true, rightAlign: false };

//----------------------------------------------------------------------
export default ObjectTable;
